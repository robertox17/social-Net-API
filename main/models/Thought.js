const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reactions');
const dateFormat = require('../utils/dateFormat');

const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: 'please leave a thought',
            minlength: 1,
            maxlength: 280
        },
        createdAt:{
            type: Date,
            get: (date) => dateFormat(date),
        },
        username:{
            type:String,
            required:true
        },
        reactions:[reactionSchema]
    },
    { 
        toJSON: {
        virtuals: true,
      },
      id: false,
    }
    );
    thoughtSchema
        .virtual('reactionCount')
        .get(function(){
            return this.reactions.length;
        });

        const Thought = model('thought', thoughtSchema);

        module.exports = Thought;
