import z from "zod";

export const userSchema = z.object({
  _id: z.string().optional(),
  firstName: z
    .string()
    .trim()
    .nonempty({
      message: "First Name is Required!",
    })
    .min(2, { message: "First Name is too short!" })
    .max(30, { message: "First Name is too long!" }),
  lastName: z
    .string()
    .trim()
    .nonempty({
      message: "Last Name is Required!",
    })
    .min(1, { message: "Last Name is too short!" })
    .max(30, { message: "Last Name is too long!" }),
  age: z
    .number({
      invalid_type_error: "Age is Required!",
    })
    .min(1, { message: "Age must be a number between 1 and 150!" })
    .max(150, { message: "Age must be a number between 1 and 150!" })
    .int({ message: "Please give age as an integer number!" })
    .positive({ message: "Age must be postive!" }),
  phoneNumber: z
    .string()
    .length(10, { message: "Phone Number have must be 10 characters!" }),
});
