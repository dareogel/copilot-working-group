import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { ProductDetail } from './index';
import type { Product } from '../../types/product';

// Mock the subcomponents and hooks
vi.mock('../ProductNavigation', () => ({
  ProductNavigation: () => <div data-testid="product-navigation">Navigation</div>,
}));

vi.mock('../ProductImage', () => ({
  ProductImage: () => <div data-testid="product-image">Product Image</div>,
}));

vi.mock('../ProductInfo', () => ({
  ProductInfo: () => <div data-testid="product-info">Product Info</div>,
}));

vi.mock('../ProductMeta', () => ({
  ProductMeta: () => <div data-testid="product-meta">Product Meta</div>,
}));

vi.mock('../ProductActions', () => ({
  ProductActions: () => <div data-testid="product-actions">Product Actions</div>,
}));

describe('ProductDetail Component', () => {
  describe('Test 1: Component renders correctly with sample product data', () => {
    it('should render the ProductDetail component with all its sections', () => {
      // Act
      render(<ProductDetail />);

      // Assert
      expect(screen.getByTestId('product-navigation')).toBeInTheDocument();
      expect(screen.getByTestId('product-image')).toBeInTheDocument();
      expect(screen.getByTestId('product-info')).toBeInTheDocument();
      expect(screen.getByTestId('product-meta')).toBeInTheDocument();
      expect(screen.getByTestId('product-actions')).toBeInTheDocument();
    });
  });

  describe('Test 2: Component displays all subcomponents', () => {
    it('should display ProductImage, ProductInfo, ProductMeta, and ProductActions subcomponents', () => {
      // Act
      render(<ProductDetail />);

      // Assert - Verify all key subcomponents are present
      const productImage = screen.getByTestId('product-image');
      const productInfo = screen.getByTestId('product-info');
      const productMeta = screen.getByTestId('product-meta');
      const productActions = screen.getByTestId('product-actions');

      expect(productImage).toBeInTheDocument();
      expect(productInfo).toBeInTheDocument();
      expect(productMeta).toBeInTheDocument();
      expect(productActions).toBeInTheDocument();
    });

    it('should render subcomponents in the correct structure', () => {
      // Act
      const { container } = render(<ProductDetail />);

      // Assert - Check DOM structure
      const infoSection = container.querySelector('[class*="infoSection"]');
      expect(infoSection).toBeInTheDocument();
      
      // Info section should contain ProductInfo, ProductMeta, and ProductActions
      const productInfo = screen.getByTestId('product-info');
      const productMeta = screen.getByTestId('product-meta');
      const productActions = screen.getByTestId('product-actions');
      
      expect(infoSection).toContainElement(productInfo);
      expect(infoSection).toContainElement(productMeta);
      expect(infoSection).toContainElement(productActions);
    });
  });
});
