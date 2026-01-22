import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { ProductActions } from './index';
import type { Product } from '../../types/product';

// Mock dependencies
const mockAddToCart = vi.fn();
const mockProduct: Product = {
  id: 1,
  title: 'Test Product',
  description: 'Test Description',
  category: 'electronics',
  price: 99.99,
  rating: 4.5,
  stock: 10,
  brand: 'Test Brand',
  availabilityStatus: 'In Stock',
  returnPolicy: '30 days',
  thumbnail: 'https://example.com/thumb.jpg',
  images: ['https://example.com/image1.jpg'],
};

vi.mock('../../hooks/useProduct');
vi.mock('../../contexts/useCartContext');

describe('ProductActions Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Test 3: Add to Cart functionality', () => {
    it('should trigger addToCart when Add to Cart button is clicked with valid product', async () => {
      // Arrange
      const { useProduct } = await import('../../hooks/useProduct');
      const { useCartContext } = await import('../../contexts/useCartContext');
      
      vi.mocked(useProduct).mockReturnValue({
        data: mockProduct,
        isLoading: false,
        isError: false,
        error: null,
      } as any);
      
      vi.mocked(useCartContext).mockReturnValue({
        addToCart: mockAddToCart,
        items: [],
        removeFromCart: vi.fn(),
        updateQuantity: vi.fn(),
        clearCart: vi.fn(),
        totalItems: 0,
        totalPrice: 0,
      });

      const user = userEvent.setup();

      // Act
      render(<ProductActions />);
      const addButton = screen.getByRole('button', { name: /add to cart/i });
      await user.click(addButton);

      // Assert
      expect(mockAddToCart).toHaveBeenCalledTimes(1);
      expect(mockAddToCart).toHaveBeenCalledWith(mockProduct);
    });

    it('should display Add to Cart button', async () => {
      // Arrange
      const { useProduct } = await import('../../hooks/useProduct');
      const { useCartContext } = await import('../../contexts/useCartContext');
      
      vi.mocked(useProduct).mockReturnValue({
        data: mockProduct,
        isLoading: false,
        isError: false,
        error: null,
      } as any);
      
      vi.mocked(useCartContext).mockReturnValue({
        addToCart: mockAddToCart,
        items: [],
        removeFromCart: vi.fn(),
        updateQuantity: vi.fn(),
        clearCart: vi.fn(),
        totalItems: 0,
        totalPrice: 0,
      });

      // Act
      render(<ProductActions />);

      // Assert
      const addButton = screen.getByRole('button', { name: /add to cart/i });
      expect(addButton).toBeInTheDocument();
    });
  });

  describe('Test 4: Component handles missing or incomplete product data gracefully', () => {
    it('should not call addToCart when product data is undefined', async () => {
      // Arrange
      const { useProduct } = await import('../../hooks/useProduct');
      const { useCartContext } = await import('../../contexts/useCartContext');
      
      vi.mocked(useProduct).mockReturnValue({
        data: undefined,
        isLoading: false,
        isError: false,
        error: null,
      } as any);
      
      vi.mocked(useCartContext).mockReturnValue({
        addToCart: mockAddToCart,
        items: [],
        removeFromCart: vi.fn(),
        updateQuantity: vi.fn(),
        clearCart: vi.fn(),
        totalItems: 0,
        totalPrice: 0,
      });

      const user = userEvent.setup();

      // Act
      render(<ProductActions />);
      const addButton = screen.getByRole('button', { name: /add to cart/i });
      await user.click(addButton);

      // Assert - addToCart should NOT be called when product is undefined
      expect(mockAddToCart).not.toHaveBeenCalled();
    });

    it('should not call addToCart when product data is null', async () => {
      // Arrange
      const { useProduct } = await import('../../hooks/useProduct');
      const { useCartContext } = await import('../../contexts/useCartContext');
      
      vi.mocked(useProduct).mockReturnValue({
        data: null,
        isLoading: false,
        isError: false,
        error: null,
      } as any);
      
      vi.mocked(useCartContext).mockReturnValue({
        addToCart: mockAddToCart,
        items: [],
        removeFromCart: vi.fn(),
        updateQuantity: vi.fn(),
        clearCart: vi.fn(),
        totalItems: 0,
        totalPrice: 0,
      });

      const user = userEvent.setup();

      // Act
      render(<ProductActions />);
      const addButton = screen.getByRole('button', { name: /add to cart/i });
      await user.click(addButton);

      // Assert - addToCart should NOT be called when product is null
      expect(mockAddToCart).not.toHaveBeenCalled();
    });

    it('should render button even when product data is missing', async () => {
      // Arrange
      const { useProduct } = await import('../../hooks/useProduct');
      const { useCartContext } = await import('../../contexts/useCartContext');
      
      vi.mocked(useProduct).mockReturnValue({
        data: undefined,
        isLoading: false,
        isError: false,
        error: null,
      } as any);
      
      vi.mocked(useCartContext).mockReturnValue({
        addToCart: mockAddToCart,
        items: [],
        removeFromCart: vi.fn(),
        updateQuantity: vi.fn(),
        clearCart: vi.fn(),
        totalItems: 0,
        totalPrice: 0,
      });

      // Act
      render(<ProductActions />);

      // Assert - Button should still be rendered
      const addButton = screen.getByRole('button', { name: /add to cart/i });
      expect(addButton).toBeInTheDocument();
    });
  });
});
