export default function InputField({
  label,
  type,
  placeholder,
  value,
  onChange,
  error,
  name,
}) {
  return (
    <div className="mb-5">
      <label>{label}</label>
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
