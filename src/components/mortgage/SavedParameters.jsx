import { useTranslation } from "react-i18next";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2, Download } from "lucide-react";

export default function SavedParameters({ savedItems, onLoad, onDelete }) {
  const { t, i18n } = useTranslation();

  if (savedItems.length === 0) {
    return null;
  }

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    const locale = i18n.language.startsWith('zh') ? 'zh-TW' : 'en-US';
    return date.toLocaleString(locale, {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="max-w-4xl mx-auto px-4">
      <Card>
        <CardHeader>
          <CardTitle>{t('mortgageCalc.savedParamsTitle')}</CardTitle>
          <CardDescription>
            {t('mortgageCalc.savedParamsDesc')}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {savedItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
              >
                <div className="flex-1">
                  <div className="font-medium text-slate-900 dark:text-slate-100 mb-1">
                    {item.name}
                  </div>
                  <div className="text-sm text-slate-600 dark:text-slate-400 space-y-1">
                    <div>
                      {t('mortgageCalc.loanAmount')}: {item.parameters.loanAmount} |
                      {t('mortgageCalc.annualRate')}: {item.parameters.annualRate}% |
                      {t('mortgageCalc.loanTerm')}: {item.parameters.loanTerm}
                    </div>
                    <div>
                      {t('mortgageCalc.gracePeriod')}: {item.parameters.gracePeriod} |
                      {t('mortgageCalc.startYear')}: {item.parameters.startYear} |
                      {t('mortgageCalc.currentYear')}: {item.parameters.currentYear}
                    </div>
                    <div className="text-xs text-slate-500 dark:text-slate-500 mt-1">
                      {t('mortgageCalc.savedAt', { time: formatDate(item.savedAt) })}
                    </div>
                  </div>
                </div>
                <div className="flex gap-2 ml-4">
                  <Button
                    onClick={() => onLoad(item.parameters)}
                    variant="outline"
                    size="sm"
                    className="gap-2"
                  >
                    <Download className="h-4 w-4" />
                    {t('mortgageCalc.load')}
                  </Button>
                  <Button
                    onClick={() => onDelete(item.id)}
                    variant="destructive"
                    size="sm"
                    className="gap-2"
                  >
                    <Trash2 className="h-4 w-4" />
                    {t('mortgageCalc.delete')}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
