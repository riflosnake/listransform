

export function transformList(list, options) {
    let result = [];

    if (options.splitInHalf) {
        const mid = Math.ceil(list.length / 2);
        result.push(list.slice(0, mid), list.slice(mid));
    }

    if (options.removeDuplicates) {
        result.push([...new Set(list)]);
    }

    if (options.orderedList) {
        result.push(list.sort());
    }

    if (options.reverseList) {
        result.push(list.reverse());
    }

    if (options.shuffleList) {
        result.push(list.sort(() => Math.random() - 0.5));
    }

    if (options.rotateLeft) {
        const n = options.rotateLeft;
        result.push([...list.slice(n), ...list.slice(0, n)]);
    }

    if (options.rotateRight) {
        const n = options.rotateRight;
        result.push([...list.slice(-n), ...list.slice(0, -n)]);
    }

    if (options.filter) {
        const condition = options.filter;
        result.push(list.filter(condition));
    }

    if (options.map) {
        const mapper = options.map;
        result.push(list.map(mapper));
    }

    if (options.reduce) {
        const reducer = options.reduce;
        const initialValue = options.initialValue || 0;
        result.push(list.reduce(reducer, initialValue));
    }

    if (options.join) {
        const separator = options.join.separator || ",";
        result.push(list.join(separator));
    }

    if (options.flat) {
        const depth = options.flat.depth || 1;
        result.push(list.flat(depth));
    }

    if (options.slice) {
        const { start, end } = options.slice;
        result.push(list.slice(start, end));
    }

    if (options.some) {
        const condition = options.some;
        result.push(list.some(condition));
    }

    if (options.every) {
        const condition = options.every;
        result.push(list.every(condition));
    }

    if (options.groupBy) {
        const grouper = options.groupBy;
        const groups = new Map();
        list.forEach(item => {
            const group = grouper(item);
            if (!groups.has(group)) {
                groups.set(group, []);
            }
            groups.get(group).push(item);
        });
        result.push(groups);
    }

    if (options.partition) {
        const partitioner = options.partition;
        const partitions = new Map();
        list.forEach(item => {
            const partition = partitioner(item);
            if (!partitions.has(partition)) {
                partitions.set(partition, []);
            }
            partitions.get(partition).push(item);
        });
        result.push(partitions);
    }

    if (options.chunk) {
        const size = options.chunk;
        const chunks = [];
        for (let i = 0; i < list.length; i += size) {
            chunks.push(list.slice(i, i + size));
        }
        result.push(chunks);
    }

    if (options.flattenDeep) {
        const flattened = list => list.reduce(
            (acc, val) => Array.isArray(val) ? acc.concat(transformList(val, {flattenDeep: true})) : acc.concat(val),
            []
        );
        result.push(flattened(list));
    }

    if (options.countBy) {
        const counter = options.countBy;
        const counts = {};
        list.forEach(item => {
            const key = counter(item);
            counts[key] = counts[key] ? counts[key] + 1 : 1;
        });
        result.push(counts);
    }
    if (options.zip) {
        const arrays = options.zip;
        const zipped = arrays[0].map((_, i) => arrays.map(array => array[i]));
        result.push(zipped);
    }

    if (options.unzip) {
        const array = options.unzip;
        const unzipped = array[0].map((_, i) => array.map(subarray => subarray[i]));
        result.push(unzipped);
    }

    if (options.sum) {
        const sum = list.reduce((acc, item) => acc + item, 0);
        result.push(sum);
    }

    if (options.average) {
        const sum = list.reduce((acc, item) => acc + item, 0);
        const average = sum / list.length;
        result.push(average);
    }

    if (options.median) {
        const sorted = list.sort((a, b) => a - b);
        const mid = Math.floor(sorted.length / 2);
        const median = sorted.length % 2 !== 0 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
        result.push(median);
    }

    if (options.mode) {
        const countMap = {};
        list.forEach(item => {
            countMap[item] = countMap[item] ? countMap[item] + 1 : 1;
        });
        let modes = [];
        let maxCount = 0;
        for (const item in countMap) {
            const count = countMap[item];
            if (count > maxCount) {
                modes = [item];
                maxCount = count;
            } else if (count === maxCount) {
                modes.push(item);
            }
        }
        result.push(modes);
    }

    if (options.max) {
        const max = Math.max(...list);
        result.push(max);
    }

    if (options.min) {
        const min = Math.min(...list);
        result.push(min);
    }

    if (options.range) {
        const start = options.range.start;
        const end = options.range.end;
        const step = options.range.step || 1;
        const range = [];
        for (let i = start; i <= end; i += step) {
            range.push(i);
        }
        result.push(range);
    }

    return result;
}

export function compareLists(lists, options = {}) {
    const result = {};

    if (options.common) {
        result.common = lists.reduce((acc, curr) => acc.filter(value => curr.includes(value)));
    }

    if (options.unique) {
        result.unique = lists.reduce((acc, curr) => [...new Set([...acc, ...curr])], []);
    }

    if (options.commonCount) {
        const commonCounts = {};
        lists.reduce((acc, curr) => {
            curr.forEach(value => {
                if (acc.hasOwnProperty(value)) {
                    commonCounts[value] = commonCounts[value] ? commonCounts[value] + 1 : 2;
                } else {
                    acc[value] = true;
                }
            });
            return acc;
        }, {});
        result.commonCounts = commonCounts;
    }

    if (options.commonInAll) {
        result.commonInAll = lists.reduce((acc, curr) => acc.filter(value => curr.includes(value)));
    }

    if (options.uniqueInAll) {
        result.uniqueInAll = lists.reduce((acc, curr) => acc.filter(value => !curr.includes(value)));
    }

    if (options.sort) {
        result.sort = lists.flat().sort();
    }

    if (options.descending) {
        result.descending = lists.flat().sort().reverse();
    }

    if (options.limit) {
        result.limit = lists.flat().slice(0, options.limit);
    }

    return result;
}