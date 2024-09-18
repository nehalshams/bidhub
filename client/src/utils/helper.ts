import dayjs from "dayjs";

const getUser = () => {
    const userStr = localStorage.getItem('user') || ""
    const user = userStr ? JSON.parse(userStr) : null
    return user;
}
const getRemainingTime = (startDate: string, endDate: string) => {
    // Define the two dates
    const startD = dayjs(startDate);
    const endD = dayjs(endDate);
    // Calculate the difference
    const duration = endD.diff(startD);

    // Convert milliseconds to days, hours, and minutes
    const totalMinutes = Math.floor(duration / (1000 * 60));
    const days = Math.floor(totalMinutes / 1440); // 1440 minutes in a day
    const hours = Math.floor((totalMinutes % 1440) / 60);
    const minutes = totalMinutes % 60;
    if(days<0 || hours < 0 || minutes < 0){
        return 'Expired'
    }
    return `${days}d ${hours}h ${minutes}min`
}
export {
    getUser,
    getRemainingTime,
}

