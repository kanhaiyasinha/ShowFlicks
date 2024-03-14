import React from "react";

function Button({ title, onClick, variant, disabled, fullWidth, type }) {
    let className = "bg-primary text-white px-4 py-2 rounded"; // Base button styles

    if (fullWidth) {
        className += " w-full";
    }

    if (variant === "outlined") {
        className = className.replace("bg-primary", "bg-white");
        className = className.replace("text-white", "text-primary");
        className += " border border-primary"; // Additional styles for outlined variant
    }

    return (
        <button
            className={className}
            type={type}
            onClick={onClick}
            disabled={disabled}
            style={{ marginBottom: '8px', marginRight: '8px' }} // Distance between buttons
        >
            {title}
        </button>
    );
}

export default Button;
