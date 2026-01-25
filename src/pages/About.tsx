import { Section } from '../components/ui/Section';
import { useI18n } from '../i18n/I18nProvider';

export default function About() {
  const { t } = useI18n();
  return (
    <>
      <Section className="bg-gradient-to-br from-slate-900 to-slate-800 py-40 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-green-500/10 to-blue-500/10 pointer-events-none" />
        <div className="text-center max-w-3xl mx-auto relative z-10">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 bg-gradient-to-r from-blue-300 via-green-300 to-blue-300 bg-clip-text text-transparent">{t('aboutPageTitle')}</h1>
          <p className="text-xl text-slate-300 mb-8 leading-relaxed">
            {t('aboutComingSoon')}
          </p>
          <div className="mt-12">
            <p className="text-slate-300 text-lg">
              {t('aboutDescription')}
            </p>
          </div>
        </div>
      </Section>
    </>
  );
}
