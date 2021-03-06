const calcTime = require('./utils/timeIST')
class Classes {
    constructor() {
        this.timeTable = {
            1: ["phy", "chem/eco", "self study", "bio/bst", "ict", "ict", 'phy/acc'],
            2: ["math", "bio/bst", "self study", "self study", "phy/acc", "eco", "self study"],
            3: ["fle/esl", "fle/esl", "math", "chem/bst", "lang", "lang", "phy/acc"],
            4: ["lang", "chem", "math", "bio/bst", "ict", "ict", "chem/eco"],
            5: ["math", "acc", "fle/esl", "fle/esl", "self study", "bio/bst", "self study"]
        }
        const [start, end] = this.generateStartTimes(calcTime(), [8, 30], 45)
        this.startTimes = start
        this.endTimes = end
        this.formated = this.formatAllTimes()
    }
    //psudo code
    // start time + class time + break time
    // 8:30 + 45 = 9:15 + 5 = 9:20
    generateStartTimes(date, startTime, classTime) {
        const startTimes = []
        const endTimes = []
        classTime += 5
        date.setHours(startTime[0], startTime[1]);
        startTimes.push(date)
        for (let i = 0; i < 6; ++i) {
            date = this.addMinutes(date, classTime)
            startTimes.push(date)
            endTimes.push(this.subMinutes(date, 5))
        }
        startTime.push(new Date(date.setHours(2, 0)))
        endTimes.push(new Date(date.setHours(2, 45)))
        return [startTimes, endTimes]
    }
    formatTimeHM(date) {
        return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: "numeric", hour12: true })
    }
    formatAllTimes() {
        return [this.startTimes.map(item => this.formatTimeHM(item)), this.endTimes.map(item => this.formatTimeHM(item))]
    }
    addMinutes(date, minutes) {
        return new Date(date.getTime() + minutes*60000);
    }
    subMinutes(date, minutes) {
        return new Date(date.getTime() - minutes*60000);
    }
    getCurrentClass(type) {
        // DOESNWT WORK IM STUPID
        const time = calcTime()
        const timeInt = time.getTime();
        for (let i = 0; i < this.startTimes.length; ++i) {
            const periodStart = this.startTimes[i].getTime();
            const periodEnd = this.endTimes[i].getTime();
            var isBetween = timeInt>=periodStart && timeInt<=periodEnd || timeInt>=periodEnd && timeInt<=periodStart
            if(isBetween) {
                var periodIndex = this.startTimes.indexOf(this.startTimes[i])
                console.log(periodStart, periodIndex, time.getDay())
                if (type === "next") {
                    return this.timeTable[time.getDay()][periodIndex+1]
                }
                else if (type === "previous") {
                    return this.timeTable[time.getDay()][periodIndex-1]
                }
                return this.timeTable[time.getDay()][periodIndex]
            }
                
        }
        
        //ill do it later
    }


    getNextClass() {

    }
}
// const classes =  {
//     times: ['8:30AM - 9:20AM', "9:20AM - 10:05AM", "10:10AM - 10:55AM", "11:00AM - 11:45","11:50PM - 12:35PM", "12:40PM - 1:25PM"],
//     1: ["phy/acc", "bio/bst", "chem/eco", "lang", "math", "phy/acc"],
//     2: ["ict", "lang", "phy/acc", "ict", "math", "self study / FREE"],
//     3: ["fle/esl", "fle/esl", "bio/bst", "chem/eco", "math", "self study / FREE"],
//     4: ["bio/bst", "chem/eco", "math", "lang", "phy/acc", "ict"],
//     5: ["lang", "chem/eco", "fle/esl", "fle/esl", "bio/bst", "ict"]
// }
// this.classes - {
        //     acc: "accounts",
        //     phy: "physics",
        //     bio: "biology",
        //     bst: "business",
        //     lang: "language",
        //     ict: "ict",
        //     free: "self study",
        //     english: "fle/esl",
        //     math: "math",
        //     chem: "chemistry"
        // }
module.exports = new Classes