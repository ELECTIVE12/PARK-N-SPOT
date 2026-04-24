const express = require('express');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const User = require('../models/User');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const generateToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });

const normalizeEmail = (email = '') => email.trim().toLowerCase();

const buildVerifyUrl = (token) => `${process.env.CLIENT_URL}/verify-email?token=${token}`;
const buildResetUrl = (token) => `${process.env.CLIENT_URL}/reset-password?token=${token}`;

const issuePasswordReset = async (user) => {
  const token = crypto.randomBytes(32).toString('hex');
  user.resetPasswordToken = crypto.createHash('sha256').update(token).digest('hex');
  user.resetPasswordExpires = Date.now() + 60 * 60 * 1000;
  await user.save();

  const resetUrl = buildResetUrl(token);

  await transporter.sendMail({
    from: `"Park 'n Spot" <${process.env.EMAIL_USER}>`,
    to: user.email,
    subject: "Password Reset Request - Park'n Spot",
    html: `
      <div style="font-family:Arial,sans-serif;max-width:520px;margin:0 auto;padding:32px;background:#fff;border-radius:8px;border:1px solid #e5e7eb;">
        <h2 style="color:#660000;margin-bottom:8px;">Park 'n Spot</h2>
        <h3 style="color:#111827;">Set or Reset Your Password</h3>
        <p style="color:#374151;font-size:14px;">Click the button below to create or update your Park 'n Spot password. This link expires in <strong>1 hour</strong>.</p>
        <a href="${resetUrl}" style="display:inline-block;margin:24px 0;padding:12px 28px;background:#660000;color:#fff;text-decoration:none;border-radius:6px;font-weight:bold;font-size:14px;">Set Password</a>
        <p style="color:#6b7280;font-size:12px;">If you didn't request this, you can safely ignore this email.</p>
        <hr style="border:none;border-top:1px solid #e5e7eb;margin:24px 0;">
        <p style="color:#9ca3af;font-size:11px;">Park 'n Spot - Smart Parking</p>
      </div>
    `,
  });
};

router.post('/signup', async (req, res) => {
  const { name, password } = req.body;
  const email = normalizeEmail(req.body.email);

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      if (existingUser.googleId && !existingUser.password) {
        existingUser.name = name || existingUser.name;
        existingUser.password = password;
        existingUser.isVerified = true;
        existingUser.verificationToken = undefined;
        existingUser.verificationTokenExpires = undefined;
        await existingUser.save();

        return res.status(200).json({
          _id: existingUser._id,
          name: existingUser.name,
          email: existingUser.email,
          token: generateToken(existingUser._id),
          message: 'Password login has been enabled for your Google account.',
        });
      }

      return res.status(400).json({ message: 'Email already registered' });
    }

    const user = await User.create({
      name,
      email,
      password,
      isVerified: true,
    });

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/verify-email', async (req, res) => {
  const { token } = req.query;

  try {
    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');
    const user = await User.findOne({
      verificationToken: hashedToken,
      verificationTokenExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ message: 'Invalid or expired verification link.' });
    }

    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpires = undefined;
    await user.save();

    res.json({ message: 'Email verified successfully. You can now log in.' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/resend-verification', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (user.isVerified) return res.json({ message: 'Already verified.' });

    const token = crypto.randomBytes(32).toString('hex');
    user.verificationToken = crypto.createHash('sha256').update(token).digest('hex');
    user.verificationTokenExpires = Date.now() + 24 * 60 * 60 * 1000;
    await user.save();

    await transporter.sendMail({
      from: `"Park 'n Spot" <${process.env.EMAIL_USER}>`,
      to: user.email,
      subject: "Verify your Park'n Spot account",
      html: `<p>Click <a href="${buildVerifyUrl(token)}">here</a> to verify your email.</p>`,
    });

    res.json({ message: 'Verification email resent.' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/login', async (req, res) => {
  const email = normalizeEmail(req.body.email);
  const { password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: 'No account found with this email.' });
    }

    if (user.googleId && !user.password) {
      return res.status(401).json({
        googleAccount: true,
        canSetPassword: true,
        message:
          'This account uses Google Sign-In. Continue with Google, or use Forgot Password to create a password for email login.',
      });
    }

    if (!(await user.matchPassword(password))) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/me', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.put('/me', protect, async (req, res) => {
  try {
    const { name, username, mobile } = req.body;
    const email = req.body.email ? normalizeEmail(req.body.email) : undefined;

    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    if (name) user.name = name;
    if (username !== undefined) user.username = username;
    if (email) user.email = email;
    if (mobile !== undefined) user.mobile = mobile;

    const updated = await user.save();
    res.json({
      _id: updated._id,
      name: updated.name,
      username: updated.username,
      email: updated.email,
      mobile: updated.mobile,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.put('/change-password', protect, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    if (!user.password) {
      user.password = newPassword;
      await user.save();
      return res.json({
        message: 'Password set successfully. You can now log in with email and password too.',
      });
    }

    const isMatch = await user.matchPassword(currentPassword);
    if (!isMatch) {
      return res.status(401).json({ message: 'Current password is incorrect.' });
    }

    user.password = newPassword;
    await user.save();

    res.json({ message: 'Password changed successfully.' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/locations', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('savedLocations');
    res.json({ success: true, data: user.savedLocations });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/locations', protect, async (req, res) => {
  try {
    const { name, info, icon } = req.body;
    const user = await User.findById(req.user._id);
    user.savedLocations.push({ name, info, icon });
    await user.save();
    res.status(201).json({ success: true, data: user.savedLocations });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.delete('/locations/:id', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    user.savedLocations = user.savedLocations.filter(
      (location) => location._id.toString() !== req.params.id
    );
    await user.save();
    res.json({ success: true, data: user.savedLocations });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/history', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('parkingHistory');
    res.json({ success: true, data: user.parkingHistory });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/history', protect, async (req, res) => {
  try {
    const { name, duration, date, status } = req.body;
    const user = await User.findById(req.user._id);
    user.parkingHistory.unshift({ name, duration, date, status });
    await user.save();
    res.status(201).json({ success: true, data: user.parkingHistory });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/forgot-password', async (req, res) => {
  const email = normalizeEmail(req.body.email);

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ message: 'If that email exists, a reset link has been sent.' });
    }

    await issuePasswordReset(user);
    res.json({ message: 'If that email exists, a reset link has been sent.' });
  } catch (err) {
    console.error('Forgot password error:', err);
    res.status(500).json({ message: 'Failed to send reset email. Please try again.' });
  }
});

router.post('/reset-password', async (req, res) => {
  const { token, password } = req.body;

  try {
    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');
    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ message: 'Reset link is invalid or has expired.' });
    }

    user.password = password;
    user.isVerified = true;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    res.json({ message: 'Password reset successful. You can now log in.' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
