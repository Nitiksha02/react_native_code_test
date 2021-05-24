import blogdata from "./blogData.json";

let data = blogdata.blogs;
function getRandomItem(arr) {
    const randomIndex = Math.floor(Math.random() * arr.length);
    const item = arr[randomIndex];
    return item;
}

const array = [13, 23, 54, 80, 90, 78, 37, 89, 12, 24, 87, 30, 22];

let blogArray = data.map((x, index) => {
    return Object.assign({ ...x, index: index, progress: 0 })
});

export default blogArray;