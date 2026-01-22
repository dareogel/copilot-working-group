import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { ProductActions } from './index';
import type { Product } from '../../types/product';
import type { UseQueryResult } from '@tanstack/react-query';

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

// Helper function to setup mocks
const setupMocks = async (productData: Product | null | undefined) => {
  const { useProduct } = await import('../../hooks/useProduct');
  const { useCartContext } = await import('../../contexts/useCartContext');
  
  vi.mocked(useProduct).mockReturnValue({
    data: productData,
    isLoading: false,
    isError: false,
    error: null,
  } as UseQueryResult<Product, Error>);
  
  vi.mocked(useCartContext).mockReturnValue({
    addToCart: mockAddToCart,
    items: [],
    removeFromCart: vi.fn(),
    updateQuantity: vi.fn(),
    clearCart: vi.fn(),
    totalItems: 0,
    totalPrice: 0,
  });
};

describe('ProductActions Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Test 3: Add to Cart functionality', () => {
    it('should trigger addToCart when Add to Cart button is clicked with valid product', async () => {
      // Arrange
      await setupMocks(mockProduct);
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
      await setupMocks(mockProduct);

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
      await setupMocks(undefined);
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
      await setupMocks(null);
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
      await setupMocks(undefined);

      // Act
      render(<ProductActions />);

      // Assert - Button should still be rendered
      const addButton = screen.getByRole('button', { name: /add to cart/i });
      expect(addButton).toBeInTheDocument();
    });
  });
});
