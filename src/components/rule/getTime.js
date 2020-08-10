const getTimeToString = (time) => {
    var now = new Date(time)
    var year = now.getFullYear()
    var month = now.getMonth() + 1
    var date = now.getDate()
    var hour = now.getHours()
    var minute = now.getMinutes()
    var second = now.getSeconds()
    if (second < 10) {
        second = '0' + second
    }

    if (minute < 10) {
        minute = '0' + minute
    }

    if (hour < 10) {
        hour = '0' + hour
    }

    if (date < 10) {
        date = '0' + date
    }

    if (month < 10) {
        month = '0' + month
    }
    return year + '-' + month + '-' + date + ' ' + hour + ':' + minute
}
export {
    getTimeToString
}