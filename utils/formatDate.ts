function formatDate(mdate: Date | undefined) {

    if (!mdate) {
        return '';
    }
    const date = new Date(mdate);
    let hours = date.getHours();
    const minutes = date.getMinutes();


    const ampm = hours >= 12 ? 'PM' : 'AM';


    hours = hours % 12;
    hours = hours ? hours : 12;


    const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;


    const month = date.getMonth() + 1;
    const day = date.getDate();
    const year = date.getFullYear();


    return `${hours}:${formattedMinutes}${ampm} ${month}/${day}/${year}`;
}

export default formatDate;

