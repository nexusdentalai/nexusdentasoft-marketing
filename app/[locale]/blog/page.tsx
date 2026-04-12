import Link from 'next/link'
import { getT } from '@/lib/i18n'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

type Article = { slug: string; title: string; excerpt: string; date: string }

const ARTICLES: Record<string, Article[]> = {
  en: [
    { slug: 'best-free-dental-pms-thailand-2025', title: 'Best Free Dental PMS for Thailand Clinics in 2025', excerpt: 'Discover the top free dental practice management solutions designed for Thai dental clinics.', date: '2025-03-15' },
    { slug: 'manage-dental-clinic-southeast-asia', title: 'How to Manage a Dental Clinic in Southeast Asia', excerpt: 'Key strategies for running a modern dental practice across Thailand, Vietnam and the region.', date: '2025-03-10' },
    { slug: 'free-vs-paid-dental-software', title: 'Free Dental Software vs Paid: What Thai Clinics Need to Know', excerpt: 'Comparing free and paid dental PMS options for clinics in Thailand and Southeast Asia.', date: '2025-03-05' },
  ],
  th: [
    { slug: 'best-free-dental-pms-thailand-2025', title: 'โปรแกรมทันตกรรมฟรีที่ดีที่สุดสำหรับคลินิกในไทย 2568', excerpt: 'ค้นพบโซลูชันจัดการคลินิกทันตกรรมฟรีที่ออกแบบมาสำหรับคลินิกไทย', date: '2568-03-15' },
    { slug: 'manage-dental-clinic-southeast-asia', title: 'วิธีบริหารคลินิกทันตกรรมในเอเชียตะวันออกเฉียงใต้', excerpt: 'กลยุทธ์สำคัญในการบริหารคลินิกทันตกรรมสมัยใหม่', date: '2568-03-10' },
    { slug: 'free-vs-paid-dental-software', title: 'ซอฟต์แวร์ทันตกรรมฟรี vs จ่ายเงิน: คลินิกไทยต้องการอะไร', excerpt: 'เปรียบเทียบตัวเลือก PMS ทันตกรรมฟรีและแบบชำระเงิน', date: '2568-03-05' },
  ],
  vn: [
    { slug: 'best-free-dental-pms-thailand-2025', title: 'Phan Mem Nha Khoa Mien Phi Tot Nhat 2025', excerpt: 'Kham pha cac giai phap quan ly phong kham nha khoa mien phi tot nhat.', date: '2025-03-15' },
    { slug: 'manage-dental-clinic-southeast-asia', title: 'Cach Quan Ly Phong Kham Nha Khoa tai Dong Nam A', excerpt: 'Chien luoc van hanh phong kham nha khoa hien dai.', date: '2025-03-10' },
    { slug: 'free-vs-paid-dental-software', title: 'Phan Mem Mien Phi vs Tra Phi: Phong Kham Can Gi', excerpt: 'So sanh PMS nha khoa mien phi va tra phi.', date: '2025-03-05' },
  ],
}

export default function BlogPage({ params }: { params: { locale: string } }) {
  const t = getT(params.locale)
  const articles = ARTICLES[params.locale] ?? ARTICLES.en

  return (
    <>
      <Navbar t={t} locale={params.locale} />
      <div className="pt-24 pb-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-extrabold text-[#0f2744] mb-2">{t.blog.title}</h1>
          <p className="text-sm text-gray-500 mb-10">{t.blog.subtitle}</p>
          <div className="space-y-6">
            {articles.map(a => (
              <Link key={a.slug} href={`/${params.locale}/blog/${a.slug}`}
                className="block bg-white rounded-xl border border-gray-100 p-6 shadow-sm hover:shadow-md hover:border-blue-200 transition-all">
                <p className="text-xs text-gray-400 mb-1">{a.date}</p>
                <h2 className="text-lg font-bold text-[#0f2744] mb-2">{a.title}</h2>
                <p className="text-sm text-gray-600 mb-3">{a.excerpt}</p>
                <span className="text-sm text-[#2e7df7] font-semibold">{t.blog.readMore}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
      <Footer t={t} locale={params.locale} />
    </>
  )
}
