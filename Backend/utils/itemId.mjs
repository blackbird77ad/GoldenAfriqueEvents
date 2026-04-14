import Counter from '../Models/Counter.mjs';

const getMaxExistingSeq = async (Model, prefix) => {
  const result = await Model.aggregate([
    {
      $match: {
        itemId: { $regex: `^${prefix}\\d+$` },
      },
    },
    {
      $project: {
        seq: {
          $toInt: {
            $substrCP: [
              '$itemId',
              1,
              { $subtract: [{ $strLenCP: '$itemId' }, 1] },
            ],
          },
        },
      },
    },
    {
      $group: {
        _id: null,
        maxSeq: { $max: '$seq' },
      },
    },
  ]);

  return result?.[0]?.maxSeq || 0;
};

export const syncCounterWithCollection = async ({
  counterName,
  Model,
  prefix,
}) => {
  const maxExistingSeq = await getMaxExistingSeq(Model, prefix);

  await Counter.findOneAndUpdate(
    { name: counterName },
    {
      $setOnInsert: { name: counterName },
      $max: { seq: maxExistingSeq },
    },
    {
      upsert: true,
      new: true,
    }
  );
};

export const getNextItemId = async ({
  counterName,
  prefix,
}) => {
  const counter = await Counter.findOneAndUpdate(
    { name: counterName },
    {
      $setOnInsert: { name: counterName },
      $inc: { seq: 1 },
    },
    {
      upsert: true,
      new: true,
    }
  );

  return `${prefix}${String(counter.seq).padStart(3, '0')}`;
};