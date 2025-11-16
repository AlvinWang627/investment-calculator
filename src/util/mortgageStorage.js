const STORAGE_KEY = 'mortgage_saved_parameters';
const MAX_SAVED_ITEMS = 10;

/**
 * 取得所有已儲存的房貸參數
 * @returns {Array} 已儲存的參數陣列
 */
export function getSavedParameters() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch (error) {
    console.error('讀取儲存參數時發生錯誤:', error);
    return [];
  }
}

/**
 * 儲存新的房貸參數
 * @param {Object} parameters - 要儲存的參數物件
 * @param {string} name - 參數集名稱（選填）
 * @returns {boolean} 是否成功儲存
 */
export function saveParameters(parameters, name = '') {
  try {
    const saved = getSavedParameters();

    // 創建新的儲存項目
    const newItem = {
      id: Date.now(),
      name: name || `參數組 ${saved.length + 1}`,
      savedAt: new Date().toISOString(),
      parameters: { ...parameters }
    };

    // 如果達到上限，移除最舊的項目
    if (saved.length >= MAX_SAVED_ITEMS) {
      saved.shift(); // 移除第一個（最舊的）
    }

    // 新增到陣列末尾
    saved.push(newItem);

    localStorage.setItem(STORAGE_KEY, JSON.stringify(saved));
    return true;
  } catch (error) {
    console.error('儲存參數時發生錯誤:', error);
    return false;
  }
}

/**
 * 刪除指定的參數集
 * @param {number} id - 要刪除的參數集 ID
 * @returns {boolean} 是否成功刪除
 */
export function deleteParameters(id) {
  try {
    const saved = getSavedParameters();
    const filtered = saved.filter(item => item.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
    return true;
  } catch (error) {
    console.error('刪除參數時發生錯誤:', error);
    return false;
  }
}

/**
 * 清空所有儲存的參數
 * @returns {boolean} 是否成功清空
 */
export function clearAllParameters() {
  try {
    localStorage.removeItem(STORAGE_KEY);
    return true;
  } catch (error) {
    console.error('清空參數時發生錯誤:', error);
    return false;
  }
}

/**
 * 取得最大儲存數量
 * @returns {number} 最大儲存數量
 */
export function getMaxSavedItems() {
  return MAX_SAVED_ITEMS;
}
