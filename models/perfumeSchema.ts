import mongoose, { Document, Schema } from 'mongoose';

export interface IPerfume extends Document {
    name: string;
    type: 'Men' | 'Women' | 'Unisex';
    pic: string;
    price: string;
    sizes: string[];
}

const fragranceSchema = new Schema<IPerfume>({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    type: {
        type: String,
        required: true,
        enum: ['Men', 'Women', 'Unisex']
    },
    pic: {
        type: String,
        required: true,
        match: [/^[a-z0-9]+$/i, 'Picture identifier should be alphanumeric']
    },
    price: {
        type: String,
        required: true,
        match: [/^\d+$/, 'Price should contain only numbers']
    },
    sizes: {
        type: [String],
        required: true,
        validate: {
            validator: (v: string[]) => v.length > 0,
            message: 'At least one size must be specified'
        }
    }
}, {
    timestamps: true
});

const Perfume: mongoose.Model<IPerfume> =
    mongoose.models.Perfume || mongoose.model<IPerfume>('Perfume', fragranceSchema);

export default Perfume;