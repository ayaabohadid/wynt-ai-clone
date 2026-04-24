import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'

export type Lang = 'en' | 'ar'

const STORAGE_KEY = 'wynt-lang'

const dict = {
  en: {
    nav: {
      features: 'Features',
      howItWorks: 'How It Works',
      pricing: 'Pricing',
      signIn: 'Sign In',
      getStarted: 'Get Started',
      toggleMenu: 'Toggle menu',
    },
    hero: {
      badge: 'AI-Powered Career Intelligence',
      titleStart: 'Your Career,',
      titleEmphasis: 'Intelligently',
      titleEnd: 'Accelerated',
      subtitle:
        'Upload your CV, match against thousands of jobs with AI precision, ace interviews with personalised coaching, and land your dream role — all in one platform.',
      startFree: 'Start for Free',
      watchDemo: 'Watch Demo',
      trust1: 'No credit card required',
      trust2: 'Free tokens included',
      trust3: '2 languages supported',
    },
    how: {
      eyebrow: 'How It Works',
      title: 'From CV to Offer in Three Steps',
      subtitle: 'A streamlined workflow that puts AI to work at every stage of your job search.',
      step: 'STEP',
      s1Title: 'Upload Your CV',
      s1Desc:
        'Our AI extracts and scores every aspect of your CV — skills, experience, formatting, and ATS compatibility — giving you an actionable intelligence score.',
      s1Highlight: 'AI scoring in seconds',
      s2Title: 'Find & Match Jobs',
      s2Desc:
        'Search millions of job postings across 12 languages. Our Deep Match Engine analyses each role across 15+ dimensions and ranks opportunities by your fit.',
      s2Highlight: '15+ match dimensions',
      s3Title: 'Practice & Apply',
      s3Desc:
        'Rehearse with AI interviewers, generate personalised cover letters, negotiate salary, and submit applications — all from one seamless workspace.',
      s3Highlight: '5 AI interviewer personas',
    },
    features: {
      eyebrow: 'Features',
      title: 'Everything You Need to Land the Role',
      subtitle: 'Purpose-built AI tools at every stage — from first CV upload to final offer.',
    },
    pricing: {
      eyebrow: 'Pricing',
      title: 'Pay Only for What You Use',
      subtitle: 'Transparent token-based pricing. No hidden fees, no surprise charges.',
      tokensQuestion: 'What Can You Do with Tokens?',
      tokensSub:
        'Each AI-powered action consumes a small number of tokens. Here are some examples:',
      mostPopular: 'Most Popular',
      startFree: 'Start for Free',
      getPro: 'Get Pro',
      contactSales: 'Contact Sales',
    },
    footer: {
      tagline: 'AI-powered career intelligence for the modern job seeker.',
      product: 'Product',
      company: 'Company',
      legal: 'Legal',
      support: 'Support',
      rights: '© 2026 Wynt AI. All rights reserved.',
    },
    signup: {
      title1: 'Start your AI-powered',
      title2: 'career journey',
      subtitle:
        'Join thousands of professionals who are finding their next role with precision AI matching, personalised coaching, and one-click applications.',
      statUsers: 'Active users',
      statMatch: 'Match rate',
      statHire: 'Faster hiring',
      fullName: 'Full name',
      email: 'Email address',
      password: 'Password',
      namePh: 'Alex Morgan',
      emailPh: 'alex@example.com',
      pwdPh: 'At least 8 characters',
      showPwd: 'Show password',
      hidePwd: 'Hide password',
      termsAgree: 'I agree to the',
      terms: 'Terms & Conditions',
      and: 'and',
      aup: 'Acceptable Use Policy',
      privacyRead: 'I have read the',
      privacy: 'Privacy Policy',
      cookie: 'Cookie Policy',
      create: 'Create Account',
      creating: 'Creating account…',
      welcome: 'Welcome,',
      ready: "Your account is ready. Let's personalise your experience next.",
      continueOnboarding: 'Continue to onboarding',
      already: 'Already have an account?',
      signin: 'Sign in',
      poweredBy: 'Powered by Wynt.AI — Your Career Copilot',
    },
    onboarding: {
      step: 'Step',
      of: 'of',
      skipForNow: 'Skip for now',
      skip: 'Skip',
      back: 'Back',
      continue: 'Continue',
      finish: 'Finish',
      welcomeEyebrow: 'Welcome to Wynt AI',
      welcomeTitle: 'Hello, there!',
      welcomeSub:
        "Let's personalize your job search experience. We'll ask a few quick questions to find the best opportunities for you.",
      takesAbout: 'Takes about 2 minutes',
      letsStart: "Let's Get Started",
      f1: 'AI Job Matching',
      f2: 'Smart CV Builder',
      f3: 'Auto Apply',
      f4: 'Interview Studio',
      allSet: "You're all set! 🎉",
      allSetSub:
        "We've tuned your match engine based on your preferences. Here's what's waiting for you in your dashboard:",
      newMatches: 'New matches',
      skillsTracked: 'Skills tracked',
      cvScore: 'CV score',
      enterDashboard: 'Enter your dashboard',
      skipCv: "Skip CV for now — I'll add it later",
    },
  },
  ar: {
    nav: {
      features: 'المميزات',
      howItWorks: 'كيف يعمل',
      pricing: 'الأسعار',
      signIn: 'تسجيل الدخول',
      getStarted: 'ابدأ الآن',
      toggleMenu: 'تبديل القائمة',
    },
    hero: {
      badge: 'ذكاء مهني مدعوم بالذكاء الاصطناعي',
      titleStart: 'مسيرتك المهنية،',
      titleEmphasis: 'بذكاء',
      titleEnd: 'متسارعة',
      subtitle:
        'ارفع سيرتك الذاتية، وطابقها مع آلاف الوظائف بدقة الذكاء الاصطناعي، وتدرّب على المقابلات مع تدريب شخصي، واحصل على وظيفة أحلامك — كل ذلك في منصة واحدة.',
      startFree: 'ابدأ مجانًا',
      watchDemo: 'شاهد العرض',
      trust1: 'لا حاجة لبطاقة ائتمان',
      trust2: 'توكنات مجانية مضمّنة',
      trust3: 'تدعم لغتين',
    },
    how: {
      eyebrow: 'كيف يعمل',
      title: 'من السيرة الذاتية إلى العرض في ثلاث خطوات',
      subtitle: 'سير عمل مبسّط يضع الذكاء الاصطناعي في خدمتك في كل مرحلة من بحثك الوظيفي.',
      step: 'الخطوة',
      s1Title: 'ارفع سيرتك الذاتية',
      s1Desc:
        'يستخرج الذكاء الاصطناعي لدينا كل جانب من سيرتك الذاتية ويقيّمه — المهارات، الخبرة، التنسيق، ومدى التوافق مع أنظمة ATS — ويعطيك درجة ذكاء قابلة للتنفيذ.',
      s1Highlight: 'تقييم ذكي في ثوانٍ',
      s2Title: 'ابحث وطابق الوظائف',
      s2Desc:
        'ابحث في ملايين إعلانات الوظائف عبر 12 لغة. يحلّل محرك المطابقة العميقة كل دور عبر أكثر من 15 بُعدًا ويرتّب الفرص حسب ملاءمتها لك.',
      s2Highlight: 'أكثر من 15 بُعد مطابقة',
      s3Title: 'تدرّب وقدّم',
      s3Desc:
        'تدرّب مع مُحاورين بالذكاء الاصطناعي، وأنشئ رسائل تقديم مخصّصة، وتفاوض على الراتب، وقدّم طلباتك — كل ذلك من مساحة عمل واحدة.',
      s3Highlight: '5 شخصيات محاور بالذكاء الاصطناعي',
    },
    features: {
      eyebrow: 'المميزات',
      title: 'كل ما تحتاجه للحصول على الوظيفة',
      subtitle: 'أدوات ذكاء اصطناعي مبنيّة لكل مرحلة — من رفع سيرتك الذاتية إلى العرض النهائي.',
    },
    pricing: {
      eyebrow: 'الأسعار',
      title: 'ادفع فقط مقابل ما تستخدمه',
      subtitle: 'تسعير شفاف قائم على التوكنات. بدون رسوم خفية أو مفاجآت.',
      tokensQuestion: 'ماذا يمكنك أن تفعل بالتوكنات؟',
      tokensSub: 'كل إجراء يستخدم الذكاء الاصطناعي يستهلك عددًا صغيرًا من التوكنات. إليك بعض الأمثلة:',
      mostPopular: 'الأكثر شعبية',
      startFree: 'ابدأ مجانًا',
      getPro: 'احصل على النسخة الاحترافية',
      contactSales: 'تواصل مع المبيعات',
    },
    footer: {
      tagline: 'ذكاء مهني مدعوم بالذكاء الاصطناعي للباحث الحديث عن عمل.',
      product: 'المنتج',
      company: 'الشركة',
      legal: 'قانوني',
      support: 'الدعم',
      rights: '© 2026 Wynt AI. جميع الحقوق محفوظة.',
    },
    signup: {
      title1: 'ابدأ رحلتك المهنية',
      title2: 'المدعومة بالذكاء الاصطناعي',
      subtitle:
        'انضم إلى آلاف المحترفين الذين يجدون وظيفتهم التالية بفضل المطابقة الدقيقة بالذكاء الاصطناعي، والتدريب الشخصي، وتقديم الطلبات بنقرة واحدة.',
      statUsers: 'مستخدم نشط',
      statMatch: 'نسبة المطابقة',
      statHire: 'توظيف أسرع',
      fullName: 'الاسم الكامل',
      email: 'البريد الإلكتروني',
      password: 'كلمة المرور',
      namePh: 'أحمد محمد',
      emailPh: 'ahmed@example.com',
      pwdPh: '8 أحرف على الأقل',
      showPwd: 'إظهار كلمة المرور',
      hidePwd: 'إخفاء كلمة المرور',
      termsAgree: 'أوافق على',
      terms: 'الشروط والأحكام',
      and: 'و',
      aup: 'سياسة الاستخدام المقبول',
      privacyRead: 'لقد قرأت',
      privacy: 'سياسة الخصوصية',
      cookie: 'سياسة ملفات تعريف الارتباط',
      create: 'إنشاء حساب',
      creating: 'جاري إنشاء الحساب…',
      welcome: 'مرحبًا،',
      ready: 'حسابك جاهز. لنخصّص تجربتك الآن.',
      continueOnboarding: 'المتابعة إلى الإعداد',
      already: 'لديك حساب بالفعل؟',
      signin: 'تسجيل الدخول',
      poweredBy: 'مدعوم من Wynt.AI — رفيقك المهني',
    },
    onboarding: {
      step: 'الخطوة',
      of: 'من',
      skipForNow: 'تخطِّ الآن',
      skip: 'تخطّي',
      back: 'السابق',
      continue: 'متابعة',
      finish: 'إنهاء',
      welcomeEyebrow: 'مرحبًا بك في Wynt AI',
      welcomeTitle: 'مرحبًا!',
      welcomeSub:
        'لنخصّص تجربة بحثك الوظيفي. سنطرح عليك بعض الأسئلة السريعة لإيجاد أفضل الفرص لك.',
      takesAbout: 'يستغرق حوالي دقيقتين',
      letsStart: 'لنبدأ',
      f1: 'مطابقة وظائف ذكية',
      f2: 'منشئ سيرة ذكي',
      f3: 'تقديم تلقائي',
      f4: 'استوديو المقابلات',
      allSet: 'كل شيء جاهز! 🎉',
      allSetSub: 'ضبطنا محرّك المطابقة بناءً على تفضيلاتك. إليك ما ينتظرك في لوحتك:',
      newMatches: 'مطابقات جديدة',
      skillsTracked: 'مهارة مُتتبَّعة',
      cvScore: 'تقييم السيرة',
      enterDashboard: 'ادخل لوحتك',
      skipCv: 'تخطّي السيرة الذاتية الآن — سأضيفها لاحقًا',
    },
  },
} as const

type Dict = typeof dict.en
type NestedKey<T, P extends string = ''> = {
  [K in keyof T]: T[K] extends object
    ? NestedKey<T[K], P extends '' ? `${K & string}` : `${P}.${K & string}`>
    : P extends ''
      ? `${K & string}`
      : `${P}.${K & string}`
}[keyof T]
export type TKey = NestedKey<Dict>

type Ctx = {
  lang: Lang
  setLang: (l: Lang) => void
  t: (key: TKey) => string
  dir: 'ltr' | 'rtl'
}

const LangCtx = createContext<Ctx | null>(null)

function getInitial(): Lang {
  if (typeof window === 'undefined') return 'en'
  const stored = window.localStorage.getItem(STORAGE_KEY)
  return stored === 'ar' ? 'ar' : 'en'
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>(getInitial)

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, lang)
    const root = document.documentElement
    root.lang = lang
    root.dir = lang === 'ar' ? 'rtl' : 'ltr'
  }, [lang])

  const t = (key: TKey): string => {
    const parts = String(key).split('.')
    let v: unknown = dict[lang]
    for (const p of parts) {
      if (v && typeof v === 'object' && p in (v as object)) {
        v = (v as Record<string, unknown>)[p]
      } else {
        v = undefined
        break
      }
    }
    return typeof v === 'string' ? v : String(key)
  }

  return (
    <LangCtx.Provider value={{ lang, setLang, t, dir: lang === 'ar' ? 'rtl' : 'ltr' }}>
      {children}
    </LangCtx.Provider>
  )
}

export function useLanguage() {
  const v = useContext(LangCtx)
  if (!v) throw new Error('useLanguage must be used inside <LanguageProvider>')
  return v
}
