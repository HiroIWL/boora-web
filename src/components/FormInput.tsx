interface FormInputProps {
    label: string;
    placeholder: string;
    type?: string;
}

export default function FormInput({ label, placeholder, type = "text" }: FormInputProps) {
    return (
        <div className="mb-6 w-full">
            <label className="block text-base font-medium text-gray-800 mb-2">
                {label}
            </label>
            <input
                type={type}
                placeholder={placeholder}
                className="w-full border border-gray-400 rounded-md px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
        </div>
    );
}
