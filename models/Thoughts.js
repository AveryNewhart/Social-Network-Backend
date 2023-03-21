const { Schema, model } = require("mongoose");

// requiring the reaction schema
const Reaction = require('./Reaction')

const thoughtsSchema = new Schema (
    {
        thoughtText: {
            type: String,
            required: true,
            min_length: 1,
            max_length: 280
        },
        createdAt: {
            type: Date,
            default: Date.now()
        },
        username: {
            type: String,
            required: true
        },
        reactions: [Reaction]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }
);

//returning the length of the reactions
thoughtsSchema.virtual("reactionCount").get(function() {
    return `${this.reactions.length}`;
});

module.exports = model('thoughts', thoughtsSchema)