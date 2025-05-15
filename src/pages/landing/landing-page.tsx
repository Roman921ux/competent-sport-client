import { Button } from "@/shared/shadcn-ui/components/ui/button";
import {
  Activity,
  Award,
  Heart,
  Mail,
  MapPin,
  Phone,
  Star,
  Users,
} from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";

export default function LandingPage() {
  const navigate = useNavigate();
  return (
    <div className="flex min-h-screen flex-col bg-primary/5">
      {/* Header */}
      <header className="costicky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold">Грамотный спорт</span>
          </div>

          <nav className="hidden md:flex gap-6">
            <NavLink to="/" className="text-sm font-medium hover:text-primary">
              Тренировки
            </NavLink>
            <NavLink
              to="/trainer"
              className="text-sm font-medium hover:text-primary"
            >
              Тренера
            </NavLink>
          </nav>

          <div className="flex items-center gap-4">
            <Button
              onClick={() => navigate("/login")}
              variant="ghost"
              size="sm"
              className="hidden md:flex"
            >
              Войти
            </Button>
            <Button
              onClick={() => navigate("/register")}
              className="bg-primary/90 hover:bg-primary"
            >
              Регистрация
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-primary/90">
          <div className="container mx-auto relative z-10 grid gap-8 md:grid-cols-2 items-center">
            <div className="space-y-6 text-white">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
                Достигайте новых высот в спорте
              </h1>
              <p className="max-w-[600px] text-white/80 md:text-xl">
                Профессиональное оборудование и помощь для спортсменов любого
                уровня. Повысьте свою производительность с нашим сервисом.
              </p>
            </div>
            <div className="relative h-full rounded-lg overflow-hidden">
              <img src="https://images.unsplash.com/photo-1601422407692-ec4eeec1d9b3?q=80&w=1925&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
            </div>
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary/80 mix-blend-multiply" />
        </section>

        {/* Features Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Почему выбирают нас
              </h2>
              <p className="mt-4 text-muted-foreground md:text-xl max-w-3xl mx-auto">
                Наша продукция разработана с учетом потребностей
                профессиональных спортсменов и любителей
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
              <div className="bg-primary/5 p-8 rounded-xl">
                <div className="h-12 w-12 rounded-full bg-primary/90 flex items-center justify-center mb-6">
                  <Award className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3">Удобство</h3>
                <p className="text-muted-foreground">
                  При разработке использовали тоько лучшие и надежные технологии
                </p>
              </div>

              <div className="bg-primary/5 p-8 rounded-xl">
                <div className="h-12 w-12 rounded-full bg-primary/90 flex items-center justify-center mb-6">
                  <Activity className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3">Эффективность</h3>
                <p className="text-muted-foreground">
                  Наш сервис помогает достигать лучших результатов за меньшее
                  время
                </p>
              </div>

              <div className="bg-primary/5 p-8 rounded-xl">
                <div className="h-12 w-12 rounded-full bg-primary/90 flex items-center justify-center mb-6">
                  <Heart className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3">Забота о здоровье</h3>
                <p className="text-muted-foreground">
                  Эргономичный дизайн снижает риск травм и обеспечивает комфорт
                  при использовании
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Products Section */}
        <section className="py-20 bg-primary/5">
          <div className="container mx-auto">
            <div className="flex justify-between items-end mb-12">
              <div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                  Лучшие тренеры
                </h2>
                <p className="mt-4 text-muted-foreground max-w-2xl">
                  Выбор профессионалов и любителей спорта
                </p>
              </div>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  name: "Анатолий П. Ф.",
                  price: "4 990 ₽",
                  rating: 5,
                  image:
                    "https://images.unsplash.com/photo-1614367674345-f414b2be3e5b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE0fHx8ZW58MHx8fHx8",
                },
                {
                  name: "Гарик А. Д.",
                  price: "1 990 ₽",
                  rating: 4,
                  image:
                    "https://images.unsplash.com/photo-1669322893266-d6ed955021fd?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDIyfHx8ZW58MHx8fHx8",
                },
                {
                  name: "Дмитрий В. Ф.",
                  price: "7 490 ₽",
                  rating: 5,
                  image:
                    "https://images.unsplash.com/photo-1548932813-88dcf75599c6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDI5fHx8ZW58MHx8fHx8",
                },
                {
                  name: "Виталий О. З.",
                  price: "2 490 ₽",
                  rating: 4,
                  image:
                    "https://images.unsplash.com/photo-1584952810828-19e3d8d825f7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDMyfHx8ZW58MHx8fHx8",
                },
              ].map((product, index) => (
                <div
                  key={index}
                  className="group relative overflow-hidden rounded-lg bg-white shadow-md transition-all hover:shadow-lg"
                >
                  <div className="aspect-square overflow-hidden">
                    <div>
                      <img src={product.image} />
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-medium">{product.name}</h3>
                    <div className="mt-1 flex items-center gap-2">
                      <div className="flex">
                        {Array(product.rating)
                          .fill(0)
                          .map((_, i) => (
                            <Star
                              key={i}
                              className="h-4 w-4 fill-primary text-primary"
                            />
                          ))}
                        {Array(5 - product.rating)
                          .fill(0)
                          .map((_, i) => (
                            <Star
                              key={i}
                              className="h-4 w-4 text-muted-foreground/30"
                            />
                          ))}
                      </div>
                      <span className="text-xs text-muted-foreground">
                        (24)
                      </span>
                    </div>
                    <div className="mt-3 flex items-center justify-between">
                      <span className="font-bold">{product.price}</span>
                      {/* <Button
                        size="sm"
                        className="bg-primary/90 hover:bg-primary"
                      >
                        В корзину
                      </Button> */}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-20 bg-white">
          <div className="container mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                Отзывы клиентов
              </h2>
              <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
                Что говорят о нас спортсмены и тренеры
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
              {[
                {
                  name: "Алексей Петров",
                  role: "Профессиональный тренер",
                  quote:
                    "Использую оборудование SportPro в своем зале уже более 3 лет. Качество на высоте, клиенты довольны.",
                },
                {
                  name: "Мария Иванова",
                  role: "Фитнес-блогер",
                  quote:
                    "Лучшее соотношение цены и качества на рынке. Рекомендую всем своим подписчикам!",
                },
                {
                  name: "Дмитрий Сидоров",
                  role: "Любитель спорта",
                  quote:
                    "Начал заниматься дома с оборудованием SportPro. Результаты превзошли все ожидания.",
                },
              ].map((testimonial, index) => (
                <div key={index} className="bg-primary/5 p-6 rounded-xl">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center">
                      <Users className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-bold">{testimonial.name}</h4>
                      <p className="text-sm text-muted-foreground">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                  <p className="italic">"{testimonial.quote}"</p>
                  <div className="mt-4 flex">
                    {Array(5)
                      .fill(0)
                      .map((_, i) => (
                        <Star
                          key={i}
                          className="h-4 w-4 fill-primary text-primary"
                        />
                      ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-primary/90 text-white">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-6">
              Готовы начать свой путь к успеху?
            </h2>
            <p className="text-white/80 max-w-2xl mx-auto mb-8 md:text-xl">
              Присоединяйтесь к тысячам спортсменов, которые уже выбрали наш
              сервис.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button
                onClick={() => navigate("/login")}
                size="lg"
                className="bg-white text-primary/90 hover:bg-white/90"
              >
                Начать сейчас
              </Button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto">
          <div className="flex justify-between">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-xl font-bold">Грамотный спорт</span>
              </div>
              <p className="text-gray-400 mb-4 max-w-lg">
                Профессиональная спортивная площадка для достижения ваших целей
              </p>
            </div>

            <div>
              <h3 className="font-bold text-lg mb-4">Контакты</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-primary shrink-0" />
                  <span className="text-gray-400">
                    г. Москва, ул. Спортивная, д. 10
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-primary" />
                  <span className="text-gray-400">+7 (800) 123-45-67</span>
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-primary" />
                  <span className="text-gray-400">info@sportpro.ru</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-400 text-sm">
            <p>
              © {new Date().getFullYear()} Грамотный спорт. Все права защищены.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
