export function generateCron(second) {
    var cron = '0 */'+second+' * * * ?'
    // var cron = '0 */1 * * * ?'
    return cron
}

export function getRate(cron) {
    var list = cron.split('/')
    var rate = list[1].split(' ')[0]
    return rate
}

