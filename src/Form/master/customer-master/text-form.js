import { Select, Button } from "rizzui";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  select: z.string(),
});

export default function SelectWithForm() {
  const { handleSubmit, control } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data) => {

  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full max-w-md"
    >
      <Controller
        name="select"
        control={control}
        render={({ field: { value, onChange }, fieldState: { error } }) => (
          <Select
            label="Select"
            value={value}
            // options={options}
            onChange={onChange}
            // getOptionValue={(option) => option.value}
            // displayValue={(selected) => options?.find((r) => r.value === selected)?.label ?? ""}
            error={error?.message}
            className="w-full max-w-md"
            clearable
            onClear={() => onChange("")}
          />
        )}
      />

      <Button
        type="submit"
        className="mt-4 w-full"
      >
        Submit
      </Button>
    </form>
  );
}