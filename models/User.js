const { Schema, model } = require('mongoose');

const UserSchema = new Schema(
    {
        username:{
            type: String,
            unique: true, 
            required: true, 
            trim: true
        },
        email:{
            type: String,
            required: true, 
            unique: true, 
            // matching??
        },
        thoughts: [{
            type: Schema.Types.ObjectId,
            ref: 'User'
        }],
        friends: [{
            type: Schema.Types.ObjectId,
            ref: 'User'
        }]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id:false 
    }
);

// UserSchema.virtual('commentCount').get(function() {
//     return this.comments.reduce(
//       (total, comment) => total + comment.replies.length + 1,
//       0
//     );
//   });

const User = model('User', UserSchema);

module.exports = User;