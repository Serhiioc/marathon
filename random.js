class Data {
    getRandom = (max) => {
        return Math.ceil(Math.random() * max);
    };
    currentTime = () => {
       const date = new Date();
        const time = date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
        return time;
    }

}

// export const getRandom = (max) => {


export default Data;