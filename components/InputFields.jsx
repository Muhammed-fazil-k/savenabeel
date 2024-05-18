export default function InputField({
  label,
  type,
  placeholder,
  value,
  onChange,
  error,
  name,
  required,
}) {
  return (
    <div className="inputField">
      <label>
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        value={value}
        onChange={onChange}
        type={type}
        placeholder={placeholder}
        name={name}
      />
      {error && <span>{error}</span>}
    </div>
  );
}
