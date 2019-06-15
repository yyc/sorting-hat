// Given a list of objects, recusively split them into a tree of sublists based on the attributes (split on the earlier attributes first)
function splitGroup(list, attributes) {
  if (attributes.length == 0) {
    return list; // as a leaf node
  }

  let attr = _.head(attributes);

  // splits the list into an object keyed by the attribute
  // https://lodash.com/docs/4.17.11#groupBy
  let tree = _.groupBy(list, attr);

  for (let key in tree) {
    tree[key] = splitGroup(tree[key], _.tail(attributes));
  }
  return tree;
}

function assignHouses(tree, houses) {
  let remainders = [];
  let numHouses = houses.length;

  if (Array.isArray(tree)) {
    // reached leaf
    remainders = tree;
  } else {
    for (let category in tree) {
      let remainder = assignHouses(tree[category], houses);
      remainders = remainders.concat(remainder);
    }
  }
  // Evenly sort what we can
  let buckets = _.chunk(remainders, numHouses);
  for (let bucket of buckets) {
    if (bucket.length != numHouses) {
      // We are in the last bucket, and these are the remaining elements
      return bucket;
    }
    // otherwise evenly allocate them
    for (let [person, house] of _.zip(bucket, houses)) {
      person["Sorting"] = house;
    }
  }
  // if we don't return before, that means we have an exact number and don't have any remainders
  return [];
}

export default function sort(students, config) {
  let { priority, seed, houses } = config;

  // shuffle the houses first

  // TODO: rounds
  // or just implement rounds as the top level sort? since they're done in order anyway

  // build tree
  let tree = splitGroup(students, priority);
  // collapse leaves
  let remainder = assignHouses(tree, houses);

  for (let [house, person] of _.zip(houses, remainder)) {
    console.log(person, house);
    if (person !== undefined) {
      person["Sorting"] = house;
    }
  }

  console.log(students);
  return students;
}
