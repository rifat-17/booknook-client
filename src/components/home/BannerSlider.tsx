"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, BookOpen, ChevronLeft, ChevronRight } from "lucide-react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";


import type { IBook } from "@/lib/books";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const slides = [
    {
        id: 1,
        subtitle: "Welcome to BookNook",
        title: "Discover Your Next Favorite Book.",
        description:
            "Explore a world of stories, knowledge, and imagination. Find the perfect book for your next reading adventure.",
    },
    {
        id: 2,
        subtitle: "Explore Our Collection",
        title: "Every Book Has a Story to Tell.",
        description:
            "From exciting fiction to inspiring non-fiction, discover books that match your interests and curiosity.",
    },
    {
        id: 3,
        subtitle: "Your Reading Journey Starts Here",
        title: "Read More. Discover More.",
        description:
            "Browse our growing collection and find your next great read. Your next favorite book is waiting for you.",
    },
];

function BookArtwork({ books }: { books: IBook[] }) {
    const rotations = ["-rotate-6", "-rotate-0", "rotate-6"];

    return (
        <div
            className="relative mx-auto flex h-[230px] w-full max-w-md items-end justify-center sm:h-[280px] lg:h-[320px]"
            aria-label="Featured books"
        >
            <div className="absolute bottom-5 h-5 w-4/5 rounded-full bg-orange-900/10 blur-xl" />

            {books.map((book, index) => (
                <div
                    key={book._id}
                    className={`relative -ml-3 h-[190px] w-[110px] overflow-hidden rounded-r-md border-l-4 border-black/20 shadow-xl transition-transform duration-500 sm:h-[225px] sm:w-[125px] lg:h-[255px] lg:w-[140px] ${index === 1 ? "z-10 -translate-y-5" : ""
                        } ${rotations[index]}`}
                >
                    <Image
                        src={book.imageUrl}
                        alt={book.title}
                        fill
                        sizes="(max-width: 640px) 110px, 140px"
                        className="object-cover"
                    />
                </div>
            ))}

            <div className="absolute top-2 right-8 size-12 rounded-full bg-orange-200/70 blur-xl" />
            <div className="absolute top-8 left-8 text-3xl text-orange-500">
                ✦
            </div>
        </div>
    );
}

export function BannerSlider({ books }: { books: IBook[] }) {
   

    return (
        <section className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8">
            <div className="relative overflow-hidden rounded-3xl bg-[#FFF3E3] shadow-sm ring-1 ring-orange-100">
                <Swiper
                    modules={[Autoplay, Pagination, Navigation]}
                    slidesPerView={1}
                    loop
                    autoplay={{
                        delay: 4500,
                        disableOnInteraction: false,
                    }}
                    pagination={{ clickable: true }}
                    navigation={{
                        prevEl: ".booknook-prev",
                        nextEl: ".booknook-next",
                    }}
                    
                    className="booknook-slider"
                >
                    {slides.map((slide, slideIndex) => {
                        const slideBooks =
                            books.length > 0
                                ? Array.from({ length: Math.min(3, books.length) }, (_, index) =>
                                    books[(slideIndex * 3 + index) % books.length]
                                )
                                : [];

                        return (
                            <SwiperSlide key={slide.id}>
                                <div className="grid min-h-[470px] items-center gap-4 px-8 py-12 sm:px-12 lg:min-h-[420px] lg:grid-cols-2 lg:gap-8 lg:px-16">
                                    <div className="relative z-10 text-center lg:text-left">
                                        <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-orange-300 bg-white/60 px-4 py-2 text-xs font-semibold text-orange-700 sm:text-sm">
                                            <BookOpen className="size-4" />
                                            {slide.subtitle}
                                        </span>

                                        <h2 className="text-3xl font-bold leading-tight tracking-tight text-[#172033] sm:text-4xl lg:text-5xl">
                                            {slide.title}
                                        </h2>

                                        <p className="mx-auto mt-5 max-w-lg text-sm leading-7 text-slate-600 sm:text-base lg:mx-0">
                                            {slide.description}
                                        </p>

                                        <Link
                                            href="/books"
                                            className="mt-7 inline-flex items-center gap-2 rounded-full bg-orange-600 px-7 py-3.5 text-sm font-semibold text-white shadow-md shadow-orange-600/20 transition-all hover:-translate-y-1 hover:bg-orange-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600"
                                        >
                                            Browse Books
                                            <ArrowRight className="size-4" />
                                        </Link>
                                    </div>

                                    {slideBooks.length > 0 ? (
                                        <BookArtwork books={slideBooks} />
                                    ) : (
                                        <div className="flex h-[230px] items-center justify-center text-slate-500 sm:h-[280px] lg:h-[320px]">
                                            <p>No books available yet.</p>
                                        </div>
                                    )}
                                </div>
                            </SwiperSlide>
                        );
                    })}
                </Swiper>

                <button
                    
                    type="button"
                    className="booknook-prev absolute top-1/2 left-3 z-20 hidden size-10 -translate-y-1/2 items-center justify-center rounded-full bg-white text-[#172033] shadow-md transition hover:bg-orange-600 hover:text-white sm:flex"
                    aria-label="Previous slide"
                >
                    <ChevronLeft className="size-5" />
                </button>

                <button
                    
                    type="button"
                    className="booknook-next absolute top-1/2 right-3 z-20 hidden size-10 -translate-y-1/2 items-center justify-center rounded-full bg-white text-[#172033] shadow-md transition hover:bg-orange-600 hover:text-white sm:flex"
                    aria-label="Next slide"
                >
                    <ChevronRight className="size-5" />
                </button>
            </div>
        </section>
    );
}