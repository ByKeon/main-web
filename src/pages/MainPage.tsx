import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';
import { motion } from 'framer-motion';
import { QrCodeIcon, PhotoIcon, CameraIcon } from '@heroicons/react/24/outline';

export function MainPage() {
  const { t, i18n } = useTranslation();
  const [linkLang, setLinkLang] = useState(i18n.language);

  useEffect(() => {
    const handleLanguageChanged = (lng: string) => setLinkLang(lng);
    i18n.on('languageChanged', handleLanguageChanged);
    return () => i18n.off('languageChanged', handleLanguageChanged);
  }, [i18n]);

  useEffect(() => {
    document.title = t('bykeon-service');
  }, [t]);

  const LIST_QrMode = [
    {
      key: 'qr-make',
      label: t('QR-Make-Name'),
      explain: t('QR-Make-Desc'),
      icon: QrCodeIcon,
    },
    {
      key: 'qr-load',
      label: t('QR-Load-Name'),
      explain: t('QR-Load-Desc'),
      icon: PhotoIcon,
    },
    {
      key: 'qr-scan',
      label: t('QR-Scan-Name'),
      explain: t('QR-Scan-Desc'),
      icon: CameraIcon,
    },
  ];

  const slideUpVariant = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="flex-1 p-8 flex flex-col items-center gap-8">
      <motion.a
        href={`https://ip.bykeon.com/${linkLang}`}
        className={clsx(
          'w-full max-w-md p-8',
          'font-bold text-center text-xl',
          'border rounded-xl shadow-md',
          'hover-base hover-border'
        )}
        variants={slideUpVariant}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0, duration: 0.5, ease: 'easeOut' }}
      >
        <p>{t('easy2get')}</p>
        <p>{t('yourIp')}</p>
      </motion.a>

      <motion.a
        href={`https://qr.bykeon.com/${linkLang}`}
        className={clsx(
          'group',
          'w-full max-w-md',
          'border rounded-xl shadow-md',
          'hover-base hover-border',
          'overflow-hidden'
        )}
        variants={slideUpVariant}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.3, duration: 0.5, ease: 'easeOut' }}
      >
        <div className="p-8 text-center">
          <h2 className="font-bold text-xl">{t('QR-Code-Name')}</h2>
        </div>

        <div className="w-full border-t group-hover:border-black" />

        <div className="p-8 flex flex-col gap-4">
          {LIST_QrMode.map((mode) => {
            const Icon = mode.icon;
            return (
              <div
                key={mode.key}
                className={clsx(
                  'p-6 border rounded-lg',
                  'group-hover:border-black'
                )}
              >
                <div className="flex items-center mb-4">
                  <Icon className="w-6 h-6 mr-4" />
                  <h2 className="text-lg group-hover:font-bold">
                    {mode.label}
                  </h2>
                </div>
                <p className="mt-4 break-words">{mode.explain}</p>
              </div>
            );
          })}
        </div>
      </motion.a>
    </div>
  );
}
