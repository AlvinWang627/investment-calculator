import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2, Download } from "lucide-react";

export default function SavedParameters({ savedItems, onLoad, onDelete }) {
  if (savedItems.length === 0) {
    return null;
  }

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleString('zh-TW', {
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
          <CardTitle>已儲存的參數</CardTitle>
          <CardDescription>
            點擊載入來快速套用參數，或刪除不需要的參數組（最多儲存 10 組）
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
                      房貸總額：{item.parameters.loanAmount} 萬元 |
                      利率：{item.parameters.annualRate}% |
                      貸款年數：{item.parameters.loanTerm} 年
                    </div>
                    <div>
                      寬限期：{item.parameters.gracePeriod} 年 |
                      開始年份：{item.parameters.startYear} |
                      目前年份：{item.parameters.currentYear}
                    </div>
                    <div className="text-xs text-slate-500 dark:text-slate-500 mt-1">
                      儲存時間：{formatDate(item.savedAt)}
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
                    載入
                  </Button>
                  <Button
                    onClick={() => onDelete(item.id)}
                    variant="destructive"
                    size="sm"
                    className="gap-2"
                  >
                    <Trash2 className="h-4 w-4" />
                    刪除
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
