import React from "react";
import ReactSelect from "react-select";

interface SelectProps {
    label: string;
    value?: Record<string, any>;
    onChange: (value: Record<string, any>) => void;
    options: Record<string, any>[];
    disabled?: boolean;
}

function Select({ disabled, label, onChange, options, value }: SelectProps) {
    return (
        <div className="z-[100] ">
            <label className="block text-sm leading-6 font-medium text-gray-900">{label}</label>
            <div className="mt-2">
                <ReactSelect
                    isDisabled={disabled}
                    value={value}
                    onChange={onChange}
                    isMulti
                    options={options}
                    // z indexma ro problemebi ar gamoiwviso radgan modalshia
                    menuPortalTarget={document.body}
                    styles={{
                        menuPortal: (base) => ({
                            ...base,
                            zIndex: 9999,
                        }),
                    }}
                    classNames={{ control: () => "text-sm" }}
                />
            </div>
        </div>
    );
}

export default Select;
