import { COUNTRIES } from "@/src/shared/constant";
import { ChevronDown, Search } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import ReactCountryFlag from "react-country-flag";

interface CountryPhoneSelectorProps {
    selectedCountryCode: string;
    onCountryChange: (countryCode: string) => void;
    phoneValue: string;
    onPhoneChange: (value: string) => void;
    phoneError?: { message?: string } | null;
    countryError?: { message?: string } | null;
    phoneRef?: React.Ref<HTMLInputElement>;
}

function CountryPhoneSelector({
    selectedCountryCode,
    onCountryChange,
    phoneValue,
    onPhoneChange,
    phoneError,
    countryError,
    phoneRef,
}: CountryPhoneSelectorProps) {
    const [open, setOpen] = useState(false);
    const [search, setSearch] = useState("");
    const dropdownRef = useRef<HTMLDivElement>(null);
    const searchRef = useRef<HTMLInputElement>(null);

    const selectedCountry =
        COUNTRIES.find((c) => c.code === selectedCountryCode) ?? COUNTRIES[0];

    const filtered = COUNTRIES.filter(
        (c) =>
            c.name.toLowerCase().includes(search.toLowerCase()) ||
            c.dialCode.includes(search)
    );

    useEffect(() => {
        function handleClickOutside(e: MouseEvent) {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(e.target as Node)
            ) {
                setOpen(false);
                setSearch("");
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    useEffect(() => {
        if (open) setTimeout(() => searchRef.current?.focus(), 50);
    }, [open]);

    const hasError = !!phoneError || !!countryError;

    return (
        <div className="relative" ref={dropdownRef}>
            {/* Input row */}
            <div
                className={`flex items-center border rounded-sm focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-0 ${hasError ? "border-red-400" : "border-[#E5E7EB]"
                    }`}
            >
                {/* Country trigger */}
                <button
                    type="button"
                    onClick={() => setOpen((v) => !v)}
                    className="flex items-center gap-1.5 px-3 py-3 border-r border-[#E5E7EB] text-sm font-mono text-gray-700 shrink-0 hover:bg-gray-50 transition-colors focus:outline-none"
                >
                    {/* <span className="text-lg leading-none">{selectedCountry.flag}</span> */}
                    <span className="text-xs text-gray-500 hidden sm:inline">
                        <ReactCountryFlag
                            countryCode={selectedCountry.code}
                            svg
                            style={{ width: "20px", height: "20px" }}
                        />
                    </span>
                    <span className="text-xs font-semibold ml-2">{selectedCountry.code}({selectedCountry.dialCode})</span>
                    <ChevronDown
                        className={`size-3 text-gray-400 transition-transform duration-200 ${open ? "rotate-180" : ""
                            }`}
                    />
                </button>

                {/* Phone input */}
                <input
                    ref={phoneRef}
                    type="tel"
                    placeholder="1012345678"
                    value={phoneValue}
                    onChange={(e) => onPhoneChange(e.target.value.replace(/\D/g, ""))}
                    className="flex-1 px-4 py-3 text-sm font-mono bg-transparent outline-none placeholder:text-muted-foreground"
                />
            </div>

            {/* Dropdown */}
            {open && (
                <div className="absolute z-50 top-full left-0 mt-1 w-72 bg-white border border-[#E5E7EB] rounded-md shadow-lg overflow-hidden">
                    {/* Search bar */}
                    <div className="flex items-center gap-2 px-3 py-2 border-b border-[#E5E7EB]">
                        <Search className="size-3.5 text-gray-400 shrink-0" />
                        <input
                            ref={searchRef}
                            type="text"
                            placeholder="Search country..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="flex-1 text-sm font-mono outline-none bg-transparent placeholder:text-gray-400"
                        />
                    </div>

                    {/* Country list */}
                    <ul className="max-h-52 overflow-y-auto">
                        {filtered.length === 0 ? (
                            <li className="px-3 py-3 text-sm text-gray-400 font-mono text-center">
                                No countries found
                            </li>
                        ) : (
                            filtered.map((country) => (
                                <li key={country.code}>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            onCountryChange(country.code);
                                            setOpen(false);
                                            setSearch("");
                                        }}
                                        className={`w-full flex items-center gap-3 px-3 py-2.5 text-sm font-mono hover:bg-[#EFF6FF] transition-colors text-left ${selectedCountryCode === country.code
                                            ? "bg-[#EFF6FF] text-blue-700 font-semibold"
                                            : "text-gray-700"
                                            }`}
                                    >
                                        {/* <span className="text-lg leading-none">{country.flag}</span> */}
                                        <ReactCountryFlag
                                            className="emojiFlag"
                                            countryCode={country.code}
                                            svg
                                            style={{ width: "20px", height: "20px" }}
                                        />

                                        <span className="flex-1 truncate">{country.name}</span>
                                        <span className="text-gray-400 text-xs shrink-0">
                                            {country.dialCode}
                                        </span>
                                    </button>
                                </li>
                            ))
                        )}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default CountryPhoneSelector