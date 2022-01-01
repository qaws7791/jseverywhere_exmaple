module.exports = {
    notes: async (parent, args, { models }) => {
        return await models.Note.find().limit(100);
    },
    note: async (parent,args, { models }) => {
        return await models.Note.findById(args.id);
    },
    noteFeed: async (parent, { cursor }, { models }) => {
        //limit is 10
        const limit = 10;
        let hasNextPage = false;
        let cursorQuery = {};
        // if cursor is exist
        if(cursor) {
            cursorQuery = { _id: { $lt: cursor } };
        }
        // load and sort 10 data 
        let notes = await models.Note.find(cursorQuery)
            .sort({ _id: -1 })
            .limit(limit + 1);
        
        //slice 10 data from more then 10 data
        if(notes.length > limit) {
            hasNextPage = true;
            notes = notes.slice(0, -1);
        }

        //cursor is object id of last data
        const newCursor = notes[notes.length - 1]._id;

        return {
            notes,
            cursor: newCursor,
            hasNextPage
        };
    },
    user: async (parent, { username }, { models }) => {
        return await models.User.findOne({ username });
    },
    users: async (parent, args, { models }) => {
        return await models.User.find({});
    },
    me: async (parent, args, { models, user }) => {
        return await models.User.findById(user.id);
    }
}