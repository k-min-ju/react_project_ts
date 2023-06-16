export function isEmpty(str) {
    return str == null || str == "" ? true : false;
}
export function isNotEmpty(str) {
    return str != null && str != "" ? true : false;
}

export function getDate(date) {
    if(isEmpty(date)) {
        date = new Date();
    }
    let today = '';

    let yyyy = date.getFullYear();

    let mm = date.getMonth()+1;
    if(mm < 10) mm = '0' + mm;

    let dd = date.getDate();
    if(dd < 10) dd = '0' + dd;

    today = yyyy + '' + mm + '' + dd;
    return today;
}