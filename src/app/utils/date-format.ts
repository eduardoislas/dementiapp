// Función para formatear una fecha en formato dd/mm/aaaa
function formatDate(date: Date): string {
    // Obtiene el día, el mes y el año de la fecha
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString();
    
    // Retorna la fecha formateada
    return `${day}/${month}/${year}`;
  }


  export {
    formatDate
  }