'use server';

import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function sendBookingEmail(data: {
  service: string;
  fullName: string;
  email: string;
  phone: string;
  language: string;
  contactMethod: string;
  preferredDate: string;
  preferredSlot: string;
  urgency: string;
  priorAction: string;
  caseSummary: string;
  documentCount: number;
  referral: string;
}) {
  try {
    await transporter.sendMail({
      from: `"AK Consultant Website" <${process.env.SMTP_USER}>`,
      to: 'info@akconsultant.uk',
      replyTo: data.email,
      subject: `${data.referral ? '[REFERRED] ' : ''}New Consultation Request — ${data.fullName}`,
      text: [
        'NEW CONSULTATION REQUEST',
        '',
        `Service: ${data.service}`,
        '',
        `Name: ${data.fullName}`,
        `Email: ${data.email}`,
        `Phone: ${data.phone}`,
        `Language: ${data.language}`,
        `Contact via: ${data.contactMethod}`,
        `Preferred date: ${data.preferredDate || '-'}`,
        `Preferred slot: ${data.preferredSlot}`,
        '',
        `Urgency: ${data.urgency}`,
        `Prior legal action: ${data.priorAction || '-'}`,
        '',
        'Case summary:',
        data.caseSummary,
        '',
        `Attachments mentioned: ${data.documentCount}`,
        '',
        data.referral
          ? `REFERRAL: ${data.referral} — Complimentary consultation`
          : 'CONSULTATION FEE: £100 (standard)',
      ].join('\n'),
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #0A1628; border-bottom: 3px solid #F57C20; padding-bottom: 8px;">New Consultation Request</h2>
          <table style="width: 100%; border-collapse: collapse; margin: 16px 0;">
            <tr><td style="padding: 8px 0; color: #666; width: 140px;">Service</td><td style="padding: 8px 0; font-weight: 600;">${data.service}</td></tr>
            <tr><td style="padding: 8px 0; color: #666;">Name</td><td style="padding: 8px 0; font-weight: 600;">${data.fullName}</td></tr>
            <tr><td style="padding: 8px 0; color: #666;">Email</td><td style="padding: 8px 0;"><a href="mailto:${data.email}">${data.email}</a></td></tr>
            <tr><td style="padding: 8px 0; color: #666;">Phone</td><td style="padding: 8px 0;"><a href="tel:${data.phone}">${data.phone}</a></td></tr>
            <tr><td style="padding: 8px 0; color: #666;">Language</td><td style="padding: 8px 0;">${data.language}</td></tr>
            <tr><td style="padding: 8px 0; color: #666;">Contact via</td><td style="padding: 8px 0;">${data.contactMethod}</td></tr>
            <tr><td style="padding: 8px 0; color: #666;">Preferred date</td><td style="padding: 8px 0;">${data.preferredDate || '-'}</td></tr>
            <tr><td style="padding: 8px 0; color: #666;">Preferred slot</td><td style="padding: 8px 0;">${data.preferredSlot}</td></tr>
            <tr><td style="padding: 8px 0; color: #666;">Urgency</td><td style="padding: 8px 0;">${data.urgency}</td></tr>
            <tr><td style="padding: 8px 0; color: #666;">Prior legal action</td><td style="padding: 8px 0;">${data.priorAction || '-'}</td></tr>
          </table>
          <h3 style="color: #0A1628; margin-top: 24px;">Case Summary</h3>
          <p style="background: #f8f8f8; padding: 16px; border-radius: 8px; line-height: 1.6;">${data.caseSummary.replace(/\n/g, '<br>')}</p>
          ${data.referral
            ? `<div style="margin-top: 24px; padding: 14px 18px; background: linear-gradient(135deg, #e8f5e9, #f1f8e9); border-left: 4px solid #4CAF50; border-radius: 8px;">
                <strong style="color: #2e7d32;">Referred by ${data.referral}</strong>
                <span style="color: #558b2f; display: block; font-size: 13px; margin-top: 2px;">Complimentary consultation</span>
              </div>`
            : `<div style="margin-top: 24px; padding: 14px 18px; background: #fff8e1; border-left: 4px solid #F57C20; border-radius: 8px;">
                <strong style="color: #e65100;">Consultation Fee: £100</strong>
                <span style="color: #bf360c; display: block; font-size: 13px; margin-top: 2px;">Standard rate — no referral code used</span>
              </div>`
          }
          <p style="color: #888; font-size: 12px; margin-top: 24px;">Attachments mentioned: ${data.documentCount} · Sent from akconsultant.uk</p>
        </div>
      `,
    });

    return { success: true };
  } catch (error) {
    console.error('Email send failed:', error);
    return { success: false, error: 'Failed to send email. Please try again.' };
  }
}
