import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

type UserBio = {
  name?: string;
  email?: string;
  phoneNumber?: string;
  address?: string;
  country?: string;
};

type UserBioProp = {
  userBioData: UserBio;
};

type UserBioEditorProp = {
  addUserBioData: (data: UserBio) => void;
};

const schema = yup
  .object({
    name: yup.string().required().trim(),
    email: yup.string().email().required().trim(),
    phoneNumber: yup.string().required().trim(),
    address: yup.string().required().trim(),
    country: yup.string().required().trim(),
  })
  .required();
type UserBioData = yup.InferType<typeof schema>;

export const UserBioEditor = ({ addUserBioData }: UserBioEditorProp) => {
  const {
    register,
    formState: { errors },
    watch,
  } = useForm<UserBioData>({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  watch((data) => {
    addUserBioData(data);
  });

  return (
    <section className="p-5">
      <div>
        <h5>Name:</h5>
        <input
          type="text"
          className="border p-2 border-black rounded-sm w-full"
          {...register("name")}
        />
      </div>
      <div>
        <h5>Email:</h5>
        <input
          type="email"
          className="border p-2 border-black rounded-sm w-full"
          {...register("email")}
        />
        {errors?.email ? (
          <p className="text-sm text-red-500">{errors.email.message}</p>
        ) : null}
      </div>
      <div>
        <h5>Phone Number:</h5>
        <input
          type="tel"
          className="border p-2 border-black rounded-sm w-full"
          {...register("phoneNumber")}
        />
      </div>
      <div>
        <h5>Address:</h5>
        <input
          type="text"
          className="border p-2 border-black rounded-sm w-full"
          {...register("address")}
        />
      </div>
      <div>
        <h5>Country:</h5>
        <input
          type="text"
          className="border p-2 border-black rounded-sm w-full"
          {...register("country")}
        />
      </div>
    </section>
  );
};

const UserBio = ({ userBioData }: UserBioProp) => {
  const { name, email, phoneNumber, address, country } = userBioData;
  return (
    <section>
      <div>
        <h1 className="text-center text-[50px]">{name || "John Doe"}</h1>
      </div>
      <div className="flex justify-center p-2">
        <p className="p-2">
          <b>Email:</b> {email}
        </p>
        <p className="p-2">
          <b>Phone Number:</b> {phoneNumber}
        </p>
        <p className="p-2">
          <b>Address:</b> {address}
        </p>
        <p className="p-2">
          <b>Country:</b> {country}
        </p>
      </div>
    </section>
  );
};

export default UserBio;
