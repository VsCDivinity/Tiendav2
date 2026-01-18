
export const generateId = () => Math.random().toString(36).substr(2, 9).toUpperCase();

export const formatDate = (dateStr: string) => {
  return new Date(dateStr).toLocaleDateString('es-BO', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};
