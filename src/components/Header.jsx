import { useTranslation } from 'react-i18next';
import Logo from "/src/assets/investment-calculator-logo.png";

function Header() {
  const { t } = useTranslation();

  return (
    <header className="flex flex-col items-center gap-4 py-8">
      <img src={Logo} alt="Investment Calculator Logo" className="w-16 h-16 object-contain" />
      <h1 className="text-4xl font-bold text-center bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
        {t('header.title')}
      </h1>
    </header>
  );
}


export default Header;
