const calcTime = require('./timeIST')
class Classes {
    constructor() {
        this.timeTable = {
            1: ["phy/acc", "bio/bst", "chem/eco", "lang", "math", "phy/acc"],
            2: ["ict", "lang", "phy/acc", "ict", "math", "self study / FREE"],
            3: ["fle/esl", "fle/esl", "bio/bst", "chem/eco", "math", "self study / FREE"],
            4: ["bio/bst", "chem/eco", "math", "lang", "phy/acc", "ict"],
            5: ["lang", "chem/eco", "fle/esl", "fle/esl", "bio/bst", "ict"]
        }
        const [start, end] = this.generateStartTimes(calcTime(), [8, 30], 45)
        this.startTimes = start
        this.endTimes = end
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
        for (let i = 0; i < 5; ++i) {
            date = this.addMinutes(date, classTime)
            startTimes.push(date)
            endTimes.push(this.subMinutes(date, 5))
        }
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
    getCurrentClass() {
        const time = calcTime();
        //ill do it later
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