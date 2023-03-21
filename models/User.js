const { Schema, model } = require("mongoose");

// requiring Thoughts Model
const thoughtsSchema = require('./Thoughts');

// mongoose email validation
require("mongoose-type-email");

//creating the userSchema
const userSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trimmed: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        thoughts: [{
            type: Schema.Types.ObjectId,
            ref: 'thoughts'
        }],
        friends: [this]
    },
    {
        toJSON: {
            virtuals: true
        },
        id: false
    }
);

//creating the virtual to get the users friend count
userSchema.virtual('friendCount').get(function() {
    return `${this.friends.length}`
});

module.exports = model('user', userSchema)