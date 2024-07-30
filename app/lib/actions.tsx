"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { Product, User } from "./models";
import { connectToDB } from "./utils";
import  bcrypt  from "bcrypt"

interface AddUserProps {
    id: string;
    username: string;
    email: string;
    password: string;
    phone: string;
    address: string;
    isAdmin: boolean;
    isActive: boolean;

}

const addUser = async (formData: FormData) => {

    try {
        // Convert formData to an object
        const userData = Object.fromEntries(formData.entries()) as unknown as AddUserProps;

        // Connect to the database
        await connectToDB();

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(userData.password, salt)

        // Create a new user instance
        const newUser = new User({
            username: userData.username,
            email: userData.email,
            password: hashedPassword,
            phone: userData.phone,
            address: userData.address,
            isAdmin: userData.isAdmin,
            isActive: userData.isActive,
        });

        // Save the new user
        await newUser.save();

    } catch (err) {
        console.error(err);
        throw new Error("Failed to create user!");
    }
            // Revalidate the users path
            revalidatePath("/dashboard/users");

            // Redirect to the users dashboard
            redirect("/dashboard/users");
};

export const updateUser = async (formData: FormData) => {

    try {
        // Convert formData to an object
        const userData = Object.fromEntries(formData.entries()) as unknown as AddUserProps;

        // Connect to the database
        await connectToDB();

        // Create an updateFields object with Partial<AddUserProps>
        const updateFields: Partial<AddUserProps> = { ...userData };

        // Iterate over the keys and delete fields with empty or undefined values
        (Object.keys(updateFields) as (keyof AddUserProps)[]).forEach((key) => {
        if (updateFields[key] === "" || updateFields[key] === undefined) {
            delete updateFields[key];
        }

    });

    await User.findByIdAndUpdate(userData.id , updateFields)

    } catch (err) {
        console.error(err);
        throw new Error("Failed to create user!");
    }
            revalidatePath("/dashboard/users");
            redirect("/dashboard/users");
};



interface AddProductProps {
    title: string;
    desc: string;
    price: number;
    stock: number;
    color: string;
    size: string;

}

export const addProduct = async (formData: FormData) => {

    try {
        // Convert formData to an object
        const productData = Object.fromEntries(formData.entries()) as unknown as AddProductProps;

        // Connect to the database
        await connectToDB();

        // Create a new user instance
        const newProduct = new Product({
            title: productData.title,
            desc: productData.desc,
            price: productData.price,
            stock: productData.stock,
            color: productData.color,
            size: productData.size,
        });

        // Save the new user
        await newProduct.save();

    } catch (err) {
        console.error(err);
        throw new Error("Failed to create product!");
    }
            // Revalidate the users path
            revalidatePath("/dashboard/products");

            // Redirect to the users dashboard
            redirect("/dashboard/products");
};

export const deleteProduct = async (FormData: FormData) => { 
    const { id } = Object.fromEntries(FormData);

    try { 
        connectToDB()
        await Product.findByIdAndDelete(id)
    } catch(err) {
        console.log(err);
        throw new Error("Failed to delete product! ")
    }
                // Revalidate the users path
                revalidatePath("/dashboard/products");

                // Redirect to the users dashboard
                redirect("/dashboard/products");
};

export const deleteUser = async (FormData: FormData) => { 
    const { id } = Object.fromEntries(FormData);

    try { 
        connectToDB()
        await User.findByIdAndDelete(id)
    } catch(err) {
        console.log(err);
        throw new Error("Failed to delete user! ")
    }
                // Revalidate the users path
                revalidatePath("/dashboard/users");

                // Redirect to the users dashboard
                redirect("/dashboard/users");
};