import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'

type Props = { params: { locale: string; slug: string } }

const CONTENT: Record<string, Record<string, { title: string; body: string }>> = {
  en: {
    'best-free-dental-pms-thailand-2025': {
      title: 'Best Free Dental PMS for Thailand Clinics in 2025',
      body: `## Why Thai Clinics Need Modern PMS Software

Running a dental clinic in Thailand in 2025 means dealing with multi-chair scheduling, patient records in Thai and English, PromptPay payments, and PDPA compliance. Most international dental software doesn't address these needs.

## What Makes NexusDentaSoft Different

NexusDentaSoft is built specifically for Southeast Asian clinics. It offers:

- **Smart multi-chair scheduling** with automatic conflict prevention
- **FDI dental chart** with interactive tooth status tracking
- **PromptPay QR payments** built-in for Thai clinics
- **PDPA compliance** with explicit patient consent management
- **Multilingual interface** in Thai, English, Vietnamese and French

## Free vs Paid: The Real Cost

Many dental PMS solutions charge 2,000-10,000 THB per month. NexusDentaSoft is completely free during the beta phase — no credit card required, no hidden fees. All features are included from day one.

## Getting Started

Setting up NexusDentaSoft takes less than 5 minutes. Create your free account, add your practitioners and chairs, and start scheduling appointments immediately. The AI-powered briefing system helps practitioners prepare for each patient automatically.

## Conclusion

For Thai dental clinics looking for a modern, free, and Thai-language-ready PMS, NexusDentaSoft is the clear choice in 2025. Built in Bangkok, designed for Southeast Asia.`,
    },
    'manage-dental-clinic-southeast-asia': {
      title: 'How to Manage a Dental Clinic in Southeast Asia',
      body: `## The Unique Challenges of SEA Dental Clinics

Dental clinics in Southeast Asia face specific challenges that Western software often ignores: multilingual patients, diverse payment methods (PromptPay, VietQR, LINE Pay), regulatory requirements like PDPA in Thailand and TM30 for foreign patients.

## Key Management Strategies

### 1. Digital Patient Records
Move from paper to digital. Modern PMS software like NexusDentaSoft provides complete FDI dental charts, treatment history, and anamnesis — all accessible instantly.

### 2. Efficient Scheduling
Multi-chair clinics need smart scheduling that prevents double-booking and color-codes practitioners. Drag-and-drop interfaces save hours of administrative work.

### 3. Automated Reminders
No-shows cost clinics significant revenue. Automated reminders via LINE (Thailand), Zalo (Vietnam), WhatsApp, and SMS reduce no-show rates by up to 30%.

### 4. Compliance First
PDPA compliance isn't optional in Thailand. Built-in consent management, data encryption, and audit logs keep your clinic legally protected.

## The Role of AI in Modern Clinics

AI-powered patient briefings save practitioners 2-3 minutes per appointment by summarizing medical history, pending treatments, and recommended actions automatically.

## Start Today

Modern clinic management doesn't require expensive software. Free tools like NexusDentaSoft provide everything a growing SEA clinic needs.`,
    },
    'free-vs-paid-dental-software': {
      title: 'Free Dental Software vs Paid: What Thai Clinics Need to Know',
      body: `## The Cost Dilemma

Thai dental clinics face a real dilemma: expensive international PMS software that doesn't understand Thai workflows, or basic free tools that lack essential features. In 2025, this gap is finally closing.

## What Free Dental PMS Offers Today

Modern free dental PMS like NexusDentaSoft includes features previously only available in paid solutions:

- **Multi-chair scheduling** with conflict prevention
- **Complete patient dossiers** with FDI dental chart
- **Treatment plan management** with timeline tracking
- **PromptPay integration** for Thai payments
- **AI-powered analytics** and patient briefings
- **PDPA compliance** built-in

## When to Choose Paid Software

Paid solutions may be better if you need:
- On-premise installation (no cloud)
- Integration with specific Thai insurance systems
- Custom reporting beyond standard analytics
- Dedicated phone support in Thai

## The Beta Model: Why It Works

NexusDentaSoft is free during its beta phase because user feedback directly shapes the product. Early adopters get full features at no cost, and the software improves based on real clinic workflows.

## Making the Decision

For most Thai clinics with 1-5 practitioners, a free PMS like NexusDentaSoft provides everything needed. The savings of 24,000-120,000 THB per year can be invested in equipment or training instead.

## Try It Risk-Free

There's no contract, no credit card, and no commitment. Set up your clinic in 5 minutes and see if it fits your workflow.`,
    },
  },
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const article = CONTENT[params.locale]?.[params.slug] ?? CONTENT.en?.[params.slug]
  if (!article) return {}
  return {
    title: `${article.title} — NexusDentaSoft Blog`,
    description: article.body.slice(0, 160).replace(/[#*]/g, ''),
  }
}

export default function BlogArticle({ params }: Props) {
  const article = CONTENT[params.locale]?.[params.slug] ?? CONTENT.en?.[params.slug]
  if (!article) notFound()

  // Simple markdown-ish rendering (tokens C1 warm V2)
  const html = article.body
    .replace(/^## (.+)$/gm, '<h2 class="text-xl font-bold text-w-900 mt-8 mb-3">$1</h2>')
    .replace(/^### (.+)$/gm, '<h3 class="text-base font-bold text-w-900 mt-6 mb-2">$1</h3>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/^- (.+)$/gm, '<li class="ml-4 text-w-700">$1</li>')
    .replace(/\n\n/g, '</p><p class="text-sm text-w-700 leading-relaxed mb-4">')

  return (
    <div className="pt-24 pb-20 px-4">
      <div className="max-w-3xl mx-auto">
        <Link href={`/${params.locale}/blog`} className="text-sm text-gold-dark hover:underline mb-4 inline-block">
          ← Blog
        </Link>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-w-900 mb-6">{article.title}</h1>
        <article className="prose prose-sm max-w-none">
          <p className="text-sm text-w-700 leading-relaxed mb-4"
            dangerouslySetInnerHTML={{ __html: html }} />
        </article>

        <div className="mt-12 p-6 bg-w-50 rounded-xl text-center">
          <h3 className="font-bold text-w-900 mb-2">Ready to try NexusDentaSoft?</h3>
          <a href={`https://app.nexusdentasoft.com/register`}
            className="inline-block mt-2 px-6 py-2.5 bg-gold text-w-0 font-semibold rounded-lg hover:bg-gold-dark text-sm">
            Start Free →
          </a>
        </div>
      </div>
    </div>
  )
}
