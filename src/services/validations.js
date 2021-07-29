export function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLocaleLowerCase());
}

export function transformDateString(dateISO) {
    let date = new Date(dateISO);
    let dateSelected;
    let tempMonth = date.getMonth()+1;
    let tempDay = date.getDate();
    let month = tempMonth.toString();
    let day = tempDay.toString();
    if (month.length < 2){
        month = '0' + month;
    }
    if (day.length < 2){
        day = '0' + day;
    }
    dateSelected = `${day}/${month}/${date.getFullYear()}`;
    return(dateSelected);
};