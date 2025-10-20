import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  image: string;
  description: string;
}

interface CartItem extends Product {
  quantity: number;
}

const products: Product[] = [
  {
    id: 1,
    name: 'Гель для душа "Мята и эвкалипт"',
    category: 'Гели для душа',
    price: 2500,
    image: 'https://cdn.poehali.dev/projects/6bc30073-2800-4970-87e9-20f434f501c8/files/5ed76ab3-45eb-4b9f-8ad1-44a2869d4e7b.jpg',
    description: 'Освежающий гель с натуральными маслами'
  },
  {
    id: 2,
    name: 'Сыворотка для лица с витамином C',
    category: 'Сыворотки',
    price: 4500,
    image: 'https://cdn.poehali.dev/projects/6bc30073-2800-4970-87e9-20f434f501c8/files/6f495ef6-bea5-4376-863a-77c25171ccd3.jpg',
    description: 'Интенсивное увлажнение и сияние'
  },
  {
    id: 3,
    name: 'Эфирное масло лаванды',
    category: 'Эфирные масла',
    price: 1800,
    image: 'https://cdn.poehali.dev/projects/6bc30073-2800-4970-87e9-20f434f501c8/files/953565fc-29a5-4d2f-ae13-7b8a757cc840.jpg',
    description: 'Чистое масло премиум качества'
  },
  {
    id: 4,
    name: 'Гель для интимной гигиены',
    category: 'Интимная гигиена',
    price: 1900,
    image: 'https://cdn.poehali.dev/projects/6bc30073-2800-4970-87e9-20f434f501c8/files/5ed76ab3-45eb-4b9f-8ad1-44a2869d4e7b.jpg',
    description: 'Деликатный уход с натуральным составом'
  },
  {
    id: 5,
    name: 'Сыворотка с гиалуроновой кислотой',
    category: 'Сыворотки',
    price: 5200,
    image: 'https://cdn.poehali.dev/projects/6bc30073-2800-4970-87e9-20f434f501c8/files/6f495ef6-bea5-4376-863a-77c25171ccd3.jpg',
    description: 'Глубокое увлажнение на 72 часа'
  },
  {
    id: 6,
    name: 'Эфирное масло розмарина',
    category: 'Эфирные масла',
    price: 1600,
    image: 'https://cdn.poehali.dev/projects/6bc30073-2800-4970-87e9-20f434f501c8/files/953565fc-29a5-4d2f-ae13-7b8a757cc840.jpg',
    description: 'Тонизирующее действие'
  }
];

const Index = () => {
  const [activeSection, setActiveSection] = useState<'home' | 'catalog' | 'about' | 'contacts'>('home');
  const [selectedCategory, setSelectedCategory] = useState<string>('Все');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const categories = ['Все', 'Гели для душа', 'Сыворотки', 'Эфирные масла', 'Интимная гигиена'];

  const filteredProducts = selectedCategory === 'Все' 
    ? products 
    : products.filter(p => p.category === selectedCategory);

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id: number) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id: number, quantity: number) => {
    if (quantity < 1) {
      removeFromCart(id);
      return;
    }
    setCart(prev => prev.map(item => 
      item.id === id ? { ...item, quantity } : item
    ));
  };

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 bg-primary text-primary-foreground border-b border-accent/20">
        <div className="container mx-auto px-6 py-6">
          <div className="flex justify-between items-center">
            <h1 className="text-4xl font-light tracking-wide">MIRONIQUE</h1>
            <nav className="flex items-center gap-8">
              <button 
                onClick={() => setActiveSection('home')}
                className={`text-sm tracking-wider transition-colors ${activeSection === 'home' ? 'text-accent' : 'hover:text-accent/80'}`}
              >
                ГЛАВНАЯ
              </button>
              <button 
                onClick={() => setActiveSection('catalog')}
                className={`text-sm tracking-wider transition-colors ${activeSection === 'catalog' ? 'text-accent' : 'hover:text-accent/80'}`}
              >
                КАТАЛОГ
              </button>
              <button 
                onClick={() => setActiveSection('about')}
                className={`text-sm tracking-wider transition-colors ${activeSection === 'about' ? 'text-accent' : 'hover:text-accent/80'}`}
              >
                О БРЕНДЕ
              </button>
              <button 
                onClick={() => setActiveSection('contacts')}
                className={`text-sm tracking-wider transition-colors ${activeSection === 'contacts' ? 'text-accent' : 'hover:text-accent/80'}`}
              >
                КОНТАКТЫ
              </button>
              <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
                <SheetTrigger asChild>
                  <button className="relative">
                    <Icon name="ShoppingBag" size={24} className="text-accent" />
                    {cart.length > 0 && (
                      <span className="absolute -top-2 -right-2 bg-accent text-primary w-5 h-5 rounded-full text-xs flex items-center justify-center">
                        {cart.reduce((sum, item) => sum + item.quantity, 0)}
                      </span>
                    )}
                  </button>
                </SheetTrigger>
                <SheetContent className="w-full sm:max-w-lg">
                  <SheetHeader>
                    <SheetTitle className="text-2xl">Корзина</SheetTitle>
                  </SheetHeader>
                  <div className="mt-8 flex flex-col h-[calc(100vh-120px)]">
                    {cart.length === 0 ? (
                      <div className="flex-1 flex items-center justify-center text-muted-foreground">
                        Корзина пуста
                      </div>
                    ) : (
                      <>
                        <div className="flex-1 overflow-y-auto space-y-4 pr-2">
                          {cart.map(item => (
                            <div key={item.id} className="flex gap-4 pb-4 border-b">
                              <img src={item.image} alt={item.name} className="w-20 h-20 object-cover" />
                              <div className="flex-1">
                                <h4 className="font-medium text-sm">{item.name}</h4>
                                <p className="text-sm text-muted-foreground mt-1">{item.price} ₽</p>
                                <div className="flex items-center gap-2 mt-2">
                                  <Button 
                                    size="sm" 
                                    variant="outline"
                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                  >
                                    -
                                  </Button>
                                  <span className="text-sm w-8 text-center">{item.quantity}</span>
                                  <Button 
                                    size="sm" 
                                    variant="outline"
                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                  >
                                    +
                                  </Button>
                                  <Button 
                                    size="sm" 
                                    variant="ghost"
                                    onClick={() => removeFromCart(item.id)}
                                    className="ml-auto"
                                  >
                                    <Icon name="Trash2" size={16} />
                                  </Button>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                        <div className="border-t pt-4 mt-4">
                          <div className="flex justify-between items-center mb-4">
                            <span className="text-lg">Итого:</span>
                            <span className="text-2xl font-semibold">{totalPrice.toLocaleString()} ₽</span>
                          </div>
                          <Button className="w-full bg-accent hover:bg-accent/90 text-primary" size="lg">
                            Оформить заказ
                          </Button>
                        </div>
                      </>
                    )}
                  </div>
                </SheetContent>
              </Sheet>
            </nav>
          </div>
        </div>
      </header>

      {activeSection === 'home' && (
        <div>
          <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
            <div 
              className="absolute inset-0 bg-cover bg-center"
              style={{ 
                backgroundImage: `url('https://cdn.poehali.dev/projects/6bc30073-2800-4970-87e9-20f434f501c8/files/6f495ef6-bea5-4376-863a-77c25171ccd3.jpg')`,
                filter: 'brightness(0.6)'
              }}
            />
            <div className="relative z-10 text-center text-white px-6">
              <h2 className="text-7xl md:text-8xl font-light mb-6 tracking-wide">MIRONIQUE</h2>
              <p className="text-xl md:text-2xl font-light tracking-widest mb-12">РОСКОШЬ НАТУРАЛЬНОГО УХОДА</p>
              <Button 
                onClick={() => setActiveSection('catalog')}
                size="lg" 
                className="bg-accent hover:bg-accent/90 text-primary text-lg px-12 py-6"
              >
                Открыть каталог
              </Button>
            </div>
          </section>

          <section className="py-24 bg-card">
            <div className="container mx-auto px-6">
              <h3 className="text-5xl font-light text-center mb-16">Философия бренда</h3>
              <div className="grid md:grid-cols-3 gap-12 max-w-5xl mx-auto">
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-6 bg-accent/10 rounded-full flex items-center justify-center">
                    <Icon name="Sparkles" size={32} className="text-accent" />
                  </div>
                  <h4 className="text-xl mb-4">Премиум качество</h4>
                  <p className="text-muted-foreground">Только натуральные ингредиенты высшего качества</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-6 bg-accent/10 rounded-full flex items-center justify-center">
                    <Icon name="Heart" size={32} className="text-accent" />
                  </div>
                  <h4 className="text-xl mb-4">Для всех</h4>
                  <p className="text-muted-foreground">Уход для мужчин и женщин, созданный с любовью</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-6 bg-accent/10 rounded-full flex items-center justify-center">
                    <Icon name="Leaf" size={32} className="text-accent" />
                  </div>
                  <h4 className="text-xl mb-4">Экологичность</h4>
                  <p className="text-muted-foreground">Забота о природе и вашем здоровье</p>
                </div>
              </div>
            </div>
          </section>
        </div>
      )}

      {activeSection === 'catalog' && (
        <section className="py-16">
          <div className="container mx-auto px-6">
            <h2 className="text-5xl font-light text-center mb-12">Каталог продукции</h2>
            
            <div className="flex flex-wrap gap-3 justify-center mb-12">
              {categories.map(category => (
                <Badge
                  key={category}
                  variant={selectedCategory === category ? 'default' : 'outline'}
                  className={`px-6 py-2 cursor-pointer text-sm tracking-wide ${
                    selectedCategory === category 
                      ? 'bg-accent text-primary hover:bg-accent/90' 
                      : 'hover:bg-accent/10'
                  }`}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </Badge>
              ))}
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProducts.map(product => (
                <Card key={product.id} className="overflow-hidden group hover:shadow-xl transition-shadow">
                  <div className="aspect-square overflow-hidden">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <CardContent className="p-6">
                    <Badge variant="outline" className="mb-3 text-xs">{product.category}</Badge>
                    <h3 className="text-xl mb-2">{product.name}</h3>
                    <p className="text-muted-foreground text-sm mb-4">{product.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-2xl font-light">{product.price.toLocaleString()} ₽</span>
                      <Button 
                        onClick={() => addToCart(product)}
                        className="bg-accent hover:bg-accent/90 text-primary"
                      >
                        В корзину
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {activeSection === 'about' && (
        <section className="py-16">
          <div className="container mx-auto px-6 max-w-4xl">
            <h2 className="text-5xl font-light text-center mb-12">О бренде MIRONIQUE</h2>
            
            <div className="prose prose-lg max-w-none">
              <div className="mb-12">
                <img 
                  src="https://cdn.poehali.dev/projects/6bc30073-2800-4970-87e9-20f434f501c8/files/953565fc-29a5-4d2f-ae13-7b8a757cc840.jpg"
                  alt="MIRONIQUE"
                  className="w-full h-96 object-cover mb-8"
                />
              </div>

              <p className="text-xl text-muted-foreground leading-relaxed mb-8">
                MIRONIQUE — это премиальный бренд косметики, созданный для тех, кто ценит качество, натуральность и элегантность. Мы верим, что уход за собой должен быть не просто ежедневной рутиной, а настоящим ритуалом красоты и удовольствия.
              </p>

              <h3 className="text-3xl font-light mb-6 mt-12">Наша миссия</h3>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                Создавать косметику высочайшего качества, которая объединяет силу природы и достижения современной науки. Каждый продукт MIRONIQUE разработан с особой тщательностью, чтобы подарить вашей коже максимальный уход и комфорт.
              </p>

              <h3 className="text-3xl font-light mb-6 mt-12">Наши ценности</h3>
              <ul className="space-y-4 text-lg text-muted-foreground">
                <li className="flex gap-3">
                  <Icon name="Check" size={24} className="text-accent flex-shrink-0 mt-1" />
                  <span><strong>Натуральность:</strong> Только проверенные натуральные ингредиенты</span>
                </li>
                <li className="flex gap-3">
                  <Icon name="Check" size={24} className="text-accent flex-shrink-0 mt-1" />
                  <span><strong>Инновации:</strong> Современные технологии производства</span>
                </li>
                <li className="flex gap-3">
                  <Icon name="Check" size={24} className="text-accent flex-shrink-0 mt-1" />
                  <span><strong>Универсальность:</strong> Продукты для мужчин и женщин</span>
                </li>
                <li className="flex gap-3">
                  <Icon name="Check" size={24} className="text-accent flex-shrink-0 mt-1" />
                  <span><strong>Экологичность:</strong> Забота об окружающей среде</span>
                </li>
              </ul>
            </div>
          </div>
        </section>
      )}

      {activeSection === 'contacts' && (
        <section className="py-16">
          <div className="container mx-auto px-6 max-w-2xl">
            <h2 className="text-5xl font-light text-center mb-12">Контакты</h2>
            
            <Card className="p-8">
              <div className="space-y-6 mb-8">
                <div className="flex gap-4">
                  <Icon name="MapPin" size={24} className="text-accent flex-shrink-0" />
                  <div>
                    <h4 className="font-medium mb-1">Адрес</h4>
                    <p className="text-muted-foreground">Москва, ул. Тверская, 1</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <Icon name="Phone" size={24} className="text-accent flex-shrink-0" />
                  <div>
                    <h4 className="font-medium mb-1">Телефон</h4>
                    <p className="text-muted-foreground">+7 (495) 123-45-67</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <Icon name="Mail" size={24} className="text-accent flex-shrink-0" />
                  <div>
                    <h4 className="font-medium mb-1">Email</h4>
                    <p className="text-muted-foreground">info@mironique.ru</p>
                  </div>
                </div>
              </div>

              <div className="border-t pt-8">
                <h3 className="text-2xl font-light mb-6">Свяжитесь с нами</h3>
                <form className="space-y-4">
                  <div>
                    <Input placeholder="Ваше имя" className="bg-background" />
                  </div>
                  <div>
                    <Input type="email" placeholder="Email" className="bg-background" />
                  </div>
                  <div>
                    <Input type="tel" placeholder="Телефон" className="bg-background" />
                  </div>
                  <div>
                    <Textarea placeholder="Сообщение" rows={5} className="bg-background" />
                  </div>
                  <Button className="w-full bg-accent hover:bg-accent/90 text-primary" size="lg">
                    Отправить сообщение
                  </Button>
                </form>
              </div>
            </Card>
          </div>
        </section>
      )}

      <footer className="bg-primary text-primary-foreground py-12 mt-24">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="text-2xl font-light mb-4">MIRONIQUE</h3>
              <p className="text-sm text-primary-foreground/70">
                Премиальная косметика для вашего ежедневного ухода
              </p>
            </div>
            <div>
              <h4 className="font-medium mb-4">Навигация</h4>
              <ul className="space-y-2 text-sm text-primary-foreground/70">
                <li><button onClick={() => setActiveSection('home')} className="hover:text-accent transition-colors">Главная</button></li>
                <li><button onClick={() => setActiveSection('catalog')} className="hover:text-accent transition-colors">Каталог</button></li>
                <li><button onClick={() => setActiveSection('about')} className="hover:text-accent transition-colors">О бренде</button></li>
                <li><button onClick={() => setActiveSection('contacts')} className="hover:text-accent transition-colors">Контакты</button></li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-4">Социальные сети</h4>
              <div className="flex gap-4">
                <Icon name="Instagram" size={24} className="text-accent hover:text-accent/80 cursor-pointer transition-colors" />
                <Icon name="Facebook" size={24} className="text-accent hover:text-accent/80 cursor-pointer transition-colors" />
                <Icon name="Twitter" size={24} className="text-accent hover:text-accent/80 cursor-pointer transition-colors" />
              </div>
            </div>
          </div>
          <div className="border-t border-primary-foreground/20 pt-8 text-center text-sm text-primary-foreground/70">
            <p>© 2024 MIRONIQUE. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
