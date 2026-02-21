'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { ArrowRight, Zap, Wrench, Edit, FileImage, FolderOpen, Settings, ShieldCheck } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ToolGrid } from '@/components/tools/ToolGrid';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { getAllTools, getToolsByCategory, getPopularTools } from '@/config/tools';
import { type Locale } from '@/lib/i18n/config';
import { CATEGORY_INFO, type ToolCategory } from '@/types/tool';

interface HomePageClientProps {
  locale: Locale;
  localizedToolContent?: Record<string, { title: string; description: string }>;
}

// ... (previous imports)

// ... (props interface)

// ... (previous imports)

// ... (props interface)

export default function HomePageClient({ locale, localizedToolContent }: HomePageClientProps) {
  const t = useTranslations();
  const allTools = getAllTools();
  const popularTools = getPopularTools();

  // Feature highlights (same as before)
  const features = [
    {
      icon: ShieldCheck,
      titleKey: 'home.features.privacy.title',
      descriptionKey: 'home.features.privacy.description',
      color: 'text-green-500',
    },
    {
      icon: Zap,
      titleKey: 'home.features.free.title',
      descriptionKey: 'home.features.free.description',
      color: 'text-yellow-500',
    },
    {
      icon: Wrench,
      titleKey: 'home.features.powerful.title',
      descriptionKey: 'home.features.powerful.description',
      color: 'text-blue-500',
    },
  ];

  // Category icons mapping
  const categoryIcons: Record<ToolCategory, typeof Edit> = {
    'edit-annotate': Edit,
    'convert-to-pdf': FileImage,
    'convert-from-pdf': FileImage,
    'organize-manage': FolderOpen,
    'optimize-repair': Settings,
    'secure-pdf': ShieldCheck,
  };

  const categoryTranslationKeys: Record<ToolCategory, string> = {
    'edit-annotate': 'editAnnotate',
    'convert-to-pdf': 'convertToPdf',
    'convert-from-pdf': 'convertFromPdf',
    'organize-manage': 'organizeManage',
    'optimize-repair': 'optimizeRepair',
    'secure-pdf': 'securePdf',
  };

  // Category sections to display
  const categoryOrder: ToolCategory[] = [
    'edit-annotate',
    'convert-to-pdf',
    'convert-from-pdf',
    'organize-manage',
    'optimize-repair',
    'secure-pdf',
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[hsl(var(--color-background))]">
      <Header locale={locale} />

      <main id="main-content" className="flex-1 relative" tabIndex={-1}>
        {/* Hero Section - Recraft-style two-column layout */}
        <section
          className="relative overflow-hidden pt-24 pb-16 lg:pt-28 lg:pb-24 bg-white"
          aria-labelledby="hero-title"
        >
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center min-h-[500px]">
              {/* Left Column - Content */}
              <div className="order-2 lg:order-1">
                {/* Breadcrumbs */}
                <nav className="text-sm text-[hsl(var(--color-muted-foreground))] mb-6" aria-label="Breadcrumb">
                  <Link href={`/${locale}`} className="hover:text-black transition-colors">
                    {t('common.navigation.home')}
                  </Link>
                  <span className="mx-2">/</span>
                  <span className="text-black font-medium">{t('home.hero.title')}</span>
                </nav>

                {/* Hero Title */}
                <h1 id="hero-title" className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-black mb-6 leading-[1.1]">
                  {t('home.hero.title')}{' '}
                  <span className="text-[hsl(var(--color-primary))]">{t('home.hero.highlight')}</span>
                </h1>

                {/* Hero Subtitle */}
                <p className="text-lg text-[hsl(var(--color-muted-foreground))] mb-8 max-w-xl leading-relaxed">
                  {t('home.hero.subtitle')}
                </p>

                {/* CTA Area - Input + Button style like Recraft */}
                <div className="flex flex-col sm:flex-row gap-3 max-w-xl">
                  <Link
                    href={`/${locale}/tools`}
                    className="flex-1 flex items-center gap-2 px-4 py-3 rounded-lg border border-[hsl(var(--color-border))] bg-[hsl(var(--color-muted)/0.5)] hover:border-[hsl(var(--color-primary)/0.5)] hover:bg-[hsl(var(--color-muted))] transition-colors"
                  >
                    <span className="text-sm text-[hsl(var(--color-muted-foreground))] truncate">
                      {t('home.hero.ctaPlaceholder') || 'Merge, compress, convert PDF...'}
                    </span>
                  </Link>
                  <Link href={`/${locale}/tools`} className="flex-shrink-0">
                    <Button
                      variant="primary"
                      size="lg"
                      className="w-full sm:w-auto h-12 px-8 bg-[hsl(var(--color-primary))] hover:bg-[hsl(var(--color-primary-hover))] text-white rounded-lg font-medium"
                    >
                      {t('home.hero.cta')}
                    </Button>
                  </Link>
                </div>

                {/* Trust badge */}
                <p className="mt-8 text-sm text-[hsl(var(--color-muted-foreground))]">
                  {t('home.hero.trustedBy') || 'Trusted by users worldwide'} · {t('common.footer.privacyBadge')}
                </p>
              </div>

              {/* Right Column - Hero Visual + Examples Card */}
              <div className="order-1 lg:order-2 relative">
                <div className="relative">
                  {/* Main hero image/visual */}
                  <div className="aspect-[4/3] rounded-2xl bg-gradient-to-br from-[hsl(var(--color-muted))] via-[hsl(var(--color-muted)/0.8)] to-[hsl(var(--color-primary)/0.1)] border border-[hsl(var(--color-border))] overflow-hidden flex items-center justify-center">
                    <div className="flex flex-col items-center gap-4 p-8 text-center">
                      <div className="flex gap-3">
                        <div className="w-16 h-20 rounded-lg bg-white/90 shadow-sm border border-[hsl(var(--color-border))] flex items-center justify-center">
                          <FileImage className="h-8 w-8 text-[hsl(var(--color-primary))]" />
                        </div>
                        <div className="w-16 h-20 rounded-lg bg-white/90 shadow-sm border border-[hsl(var(--color-border))] flex items-center justify-center">
                          <Edit className="h-8 w-8 text-[hsl(var(--color-primary))]" />
                        </div>
                        <div className="w-16 h-20 rounded-lg bg-white/90 shadow-sm border border-[hsl(var(--color-border))] flex items-center justify-center">
                          <ShieldCheck className="h-8 w-8 text-[hsl(var(--color-primary))]" />
                        </div>
                      </div>
                      <p className="text-sm font-medium text-[hsl(var(--color-muted-foreground))]">
                        {t('home.hero.visualLabel') || '90+ PDF tools at your fingertips'}
                      </p>
                    </div>
                  </div>

                  {/* Generation examples card - overlay */}
                  <div className="absolute -bottom-6 left-0 right-0 mx-4 lg:mx-0 lg:right-0 lg:left-auto lg:w-[85%] bg-white rounded-xl border border-[hsl(var(--color-border))] shadow-lg p-4">
                    <h3 className="text-sm font-semibold text-black mb-3">
                      {t('home.hero.toolExamples') || 'Tool examples'}
                    </h3>
                    <div className="grid grid-cols-4 gap-2">
                      {popularTools.slice(0, 4).map((tool) => {
                        const content = localizedToolContent?.[tool.id];
                        const title = content?.title || tool.id.replace(/-/g, ' ');
                        return (
                          <Link
                            key={tool.id}
                            href={`/${locale}/tools/${tool.slug}`}
                            className="flex flex-col items-center gap-1.5 p-2 rounded-lg hover:bg-[hsl(var(--color-muted)/0.5)] transition-colors group"
                          >
                            <div className="w-12 h-12 rounded-lg bg-[hsl(var(--color-primary)/0.1)] flex items-center justify-center group-hover:bg-[hsl(var(--color-primary)/0.2)] transition-colors">
                              <FileImage className="h-5 w-5 text-[hsl(var(--color-primary))]" />
                            </div>
                            <span className="text-xs font-medium text-black text-center line-clamp-2">
                              {title}
                            </span>
                          </Link>
                        );
                      })}
                    </div>
                    <Link
                      href={`/${locale}/tools`}
                      className="mt-3 block text-xs text-[hsl(var(--color-primary))] hover:underline font-medium"
                    >
                      {t('home.hero.browseAll') || 'Browse all tools →'}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section - Clean cards */}
        <section className="py-16 bg-white" aria-label="Features">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <Card key={index} className="p-6 border border-[hsl(var(--color-border))] bg-white rounded-xl hover:shadow-md transition-all" hover={false}>
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-[hsl(var(--color-primary)/0.1)] mb-4">
                      <Icon className={`h-6 w-6 text-[hsl(var(--color-primary))]`} aria-hidden="true" />
                    </div>
                    <h3 className="text-lg font-bold text-black mb-2">
                      {t(feature.titleKey)}
                    </h3>
                    <p className="text-sm text-[hsl(var(--color-muted-foreground))] leading-relaxed">
                      {t(feature.descriptionKey)}
                    </p>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Popular Tools Section */}
        <section className="py-16 bg-[hsl(var(--color-muted)/0.3)]" aria-labelledby="popular-tools-heading">
          <div className="container mx-auto px-4">
            <div className="text-center mb-10">
              <h2 id="popular-tools-heading" className="text-3xl font-bold text-black mb-3">
                {t('home.popularTools.title')}
              </h2>
              <p className="text-[hsl(var(--color-muted-foreground))] max-w-2xl mx-auto text-base">
                {t('home.popularTools.description')}
              </p>
            </div>
            <ToolGrid
              tools={popularTools}
              locale={locale}
              localizedToolContent={localizedToolContent}
            />
          </div>
        </section>

        <section className="py-16 bg-white" aria-labelledby="featured-tools-heading">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
              <div className="max-w-2xl">
                <h2 id="featured-tools-heading" className="text-2xl font-bold text-black mb-2">
                  {t(`home.categories.${categoryTranslationKeys['organize-manage']}`)}
                </h2>
                <p className="text-[hsl(var(--color-muted-foreground))] text-base">
                  {t(`home.categoriesDescription.${categoryTranslationKeys['organize-manage']}`)}
                </p>
              </div>
              <Link href={`/${locale}/tools`}>
                <Button variant="outline" size="sm" className="group border-[hsl(var(--color-border))] text-black hover:bg-[hsl(var(--color-muted))] rounded-lg">
                  {t('common.navigation.tools')}
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                </Button>
              </Link>
            </div>
            <ToolGrid
              tools={getToolsByCategory('organize-manage').slice(0, 8)}
              locale={locale}
              localizedToolContent={localizedToolContent}
            />
          </div>
        </section>

        {/* Tool Categories Section */}
        <section className="py-16 bg-[hsl(var(--color-muted)/0.3)]" aria-labelledby="categories-heading">
          <div className="container mx-auto px-4">
            <div className="text-center mb-10">
              <h2 id="categories-heading" className="text-3xl font-bold text-black mb-3">
                {t('home.categoriesSection.title')}
              </h2>
              <p className="text-[hsl(var(--color-muted-foreground))] max-w-2xl mx-auto text-base">
                {t('home.categoriesSection.description', { count: allTools.length })}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {categoryOrder.map((category) => {
                const categoryTools = getToolsByCategory(category);
                const Icon = categoryIcons[category];
                const categoryName = t(`home.categories.${categoryTranslationKeys[category]}`);
                const categoryDescription = t(`home.categoriesDescription.${categoryTranslationKeys[category]}`);

                return (
                  <Link
                    key={category}
                    href={`/${locale}/tools?category=${category}`}
                    className="group"
                  >
                    <Card className="p-5 h-full bg-white border border-[hsl(var(--color-border))] rounded-xl hover:shadow-md hover:border-[hsl(var(--color-primary)/0.3)] transition-all duration-300">
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-[hsl(var(--color-primary)/0.1)] flex items-center justify-center group-hover:bg-[hsl(var(--color-primary)/0.2)] transition-colors">
                          <Icon className="h-5 w-5 text-[hsl(var(--color-primary))]" aria-hidden="true" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-base text-black mb-1 group-hover:text-[hsl(var(--color-primary))] transition-colors">
                            {categoryName}
                          </h3>
                          <p className="text-xs text-[hsl(var(--color-muted-foreground))] line-clamp-2 mb-2">
                            {categoryDescription}
                          </p>
                          <div className="flex items-center text-xs font-medium text-[hsl(var(--color-primary))]">
                            <span className="bg-[hsl(var(--color-primary)/0.1)] px-2 py-0.5 rounded-md">
                              {t('home.categoriesSection.toolsCount', { count: categoryTools.length })}
                            </span>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-white" aria-label="Statistics">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-[hsl(var(--color-border))]">
              <div className="p-4">
                <div className="text-3xl lg:text-4xl font-bold text-[hsl(var(--color-primary))] mb-1">
                  {allTools.length}+
                </div>
                <div className="text-xs font-medium text-[hsl(var(--color-muted-foreground))] uppercase tracking-wider">
                  {t('home.stats.pdfTools')}
                </div>
              </div>
              <div className="p-4">
                <div className="text-3xl lg:text-4xl font-bold text-[hsl(var(--color-primary))] mb-1">
                  100%
                </div>
                <div className="text-xs font-medium text-[hsl(var(--color-muted-foreground))] uppercase tracking-wider">
                  {t('home.stats.freeToUse')}
                </div>
              </div>
              <div className="p-4">
                <div className="text-3xl lg:text-4xl font-bold text-[hsl(var(--color-primary))] mb-1">
                  9
                </div>
                <div className="text-xs font-medium text-[hsl(var(--color-muted-foreground))] uppercase tracking-wider">
                  {t('home.stats.languages')}
                </div>
              </div>
              <div className="p-4">
                <div className="text-3xl lg:text-4xl font-bold text-[hsl(var(--color-primary))] mb-1">
                  0
                </div>
                <div className="text-xs font-medium text-[hsl(var(--color-muted-foreground))] uppercase tracking-wider">
                  {t('home.stats.filesUploaded')}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer locale={locale} />
    </div>
  );
}
