import Image from "next/image";
import { Button } from "./ui/button";

interface ButtonProps {
  isLoading: boolean;
  className?: string;
  children: React.ReactNode;
}

const SubmitButton = ({ isLoading, className, children }: ButtonProps) => {
  return (
    <Button
      type="submit"
      disabled={isLoading}
      className={className ?? "w-full shad-primary-btn"}
    >
      {isLoading ? (
        <div className="flex items-center gap-4">
          <Image
            src="assets/icons/loader.svg"
            alt="loader"
            width={20}
            height={20}
            className="animate-spin"
          />
        </div>
      ) : (
        children
      )}
    </Button>
  );
};

export default SubmitButton;
