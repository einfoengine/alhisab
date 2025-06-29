import React from 'react';
import FacebookAuditForm from '../../FacebookAuditForm';
import InstagramAuditForm from '../../InstagramAuditForm';
import LinkedInAuditForm from '../../LinkedInAuditForm';
import TwitterAuditForm from '../../TwitterAuditForm';
import TikTokAuditForm from '../../TikTokAuditForm';

export default function SocialTab() {
  return (
    <div className="space-y-8">
      <FacebookAuditForm />
      <InstagramAuditForm />
      <LinkedInAuditForm />
      <TwitterAuditForm />
      <TikTokAuditForm />
    </div>
  );
} 