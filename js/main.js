// eslint-disable-next-line no-unused-vars
const convertDate = date => {
    const namaBulan = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    return `${date.getDate()} ${namaBulan[date.getMonth()]} ${date.getFullYear()} ${formatAMPM(date)}`
}

const formatAMPM = (date) => {
    let jam = date.getHours();
    let menit = date.getMinutes();
    let ampm = jam >= 12 ? 'pm' : 'am';
    jam = jam % 12;
    jam = jam ? jam : 12;
    menit = menit < 10 ? '0' + menit : menit;
    let strTime = jam + ':' + menit + ' ' + ampm;
    return strTime;
}