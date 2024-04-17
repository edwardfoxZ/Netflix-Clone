import { useContext } from "react";
import { AuthFormContext, Inputs } from "../../pages/login-page";

interface InputProps {
  id: string;
  type?: string;
  label: string;
  name: keyof Inputs;
  validate?: (text: string) => string | true;
}

export default function Input({ id, label, type, name, validate }: InputProps) {
  const { register, errors } = useContext(AuthFormContext);

  if (!register) return null;
  return (
    <div className="relative">
      <input
        type={type}
        className="block rounded-md px-6 pt-6 pb-1 w-full text-md text-white bg-neutral-700 appearance-none focus:outline-none focus:ring-0 peer invalid:border-b-1"
        id={id}
        placeholder=""
        {...register(name, {
          required: true,
          validate,
        })}
      />
      <label
        className="absolute 
          text-md
          text-zinc-400
          duration-150 
          transform 
          -translate-y-3 
          scale-75 
          z-10 
          top-4
          left-3
          origin-[0] 
          peer-placeholder-shown:scale-100 
          peer-placeholder-shown:translate-y-0 
          peer-focus:scale-75
          peer-focus:-translate-y-3"
      >
        {label}
      </label>
      {errors[name]?.type === "required" && (
        <p className="text-danger">this field requires!</p>
      )}
      {errors[name]?.type === "validate" && (
        <p className="text-danger">{errors[name]?.message}</p>
      )}
    </div>
  );
}
